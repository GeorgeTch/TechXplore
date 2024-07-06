"use client";

import { useEffect, useState } from "react";
import imgPlaceholder from "@/public/image-placeholder.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ProjectImages({ project }) {
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
    <div className="relative w-full h-full flex items-center justify-center">
      {" "}
      {/* Centering arrows */}
      <Carousel className="w-full h-full">
        <CarouselContent>
          {blobUrls.map((blobUrl, index) => (
            <CarouselItem key={index} className="h-full">
              <img
                className="w-full max-h-[400px] object-fit rounded-md"
                src={blobUrl}
                alt={project.name}
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary absolute left-4 transform -translate-y-1/2 z-10" />{" "}
        {/* Adjust styles */}
        <CarouselNext className="bg-primary absolute right-4 transform -translate-y-1/2 z-10" />{" "}
        {/* Adjust styles */}
      </Carousel>
    </div>
  );
}
