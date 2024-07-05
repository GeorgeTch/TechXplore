"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import imgPlaceholder from "@/public/image-placeholder.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Projects({ projectsInfo }) {
  const searchParams = useSearchParams();
  const searchTag = searchParams.get("tag");

  return (
    <main className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
      {projectsInfo.map((project) => (
        <div
          key={project.name}
          className="flex flex-col gap-3 items-center justify-between w-full h-full bg-secondary rounded-md p-6 hover:opacity-90  transition-all duration-500 ease-in-out relative"
        >
          <h2 className="self-start text-xl md:text-2xl font-bold">
            {project.name}
          </h2>
          <p className="text-md md:text-lg text-muted-foreground">
            {project.description}
          </p>
          <p className="self-start text-lg text-muted-foreground">
            Completion in {project.endDate.slice(0, 4)}
          </p>

          <ProjectImages project={project} />
        </div>
      ))}
    </main>
  );
}

function ProjectImages({ project }) {
  const [blobUrls, setBlobUrls] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const newBlobUrls = await Promise.all(
        project.images.map(async (image) => {
          try {
            const response = await fetch(
              `https://ideaxapp.azurewebsites.net/v1/Image/${image.url}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/octet-stream",
                },
              }
            );
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          } catch (error) {
            console.error("Error fetching image:", error);
            return null;
          }
        })
      );

      setBlobUrls(newBlobUrls.filter(Boolean));
    }

    fetchImages();

    return () => {
      blobUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [project]);

  if (blobUrls.length === 0) {
    return (
      <img
        className="rounded-md"
        src={imgPlaceholder.src}
        alt={project.name}
        width={720}
        height={480}
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full mt-2">
        <CarouselContent>
          {blobUrls.map((blobUrl, index) => (
            <CarouselItem key={index} className="p-1">
              <img
                className="rounded-md"
                src={blobUrl}
                alt={project.name}
                width={720}
                height={480}
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary absolute top-1/2 left-4 transform -translate-y-1/2 z-10" />
        <CarouselNext className="bg-primary absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
