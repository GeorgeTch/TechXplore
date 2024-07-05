"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import imgPlaceholder from "@/public/image-placeholder.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function PartnersCarousel({ companyInfo }) {
  const [api, setApi] = React.useState(null);
  const [blobUrls, setBlobUrls] = useState({});

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoplay = () => {
      if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    };

    const intervalId = setInterval(autoplay, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  useEffect(() => {
    async function fetchImages() {
      const newBlobUrls = {};

      await Promise.all(
        companyInfo.map(async (company) => {
          try {
            const response = await fetch(
              `https://ideaxapp.azurewebsites.net/v1/Image/${company.image.url}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/octet-stream",
                },
              }
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            newBlobUrls[company.id] = url;
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        })
      );

      setBlobUrls(newBlobUrls);
    }

    fetchImages();

    return () => {
      Object.values(blobUrls).forEach((url: any) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [companyInfo]);

  return (
    <Carousel
      setApi={setApi}
      className="flex-1 w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto"
    >
      <CarouselContent>
        {companyInfo.map((company) => (
          <CarouselItem key={company.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-secondary rounded-md hover:opacity-90 hover:scale-105 transition-all duration-500 ease-in-out">
                <CardContent className="p-0">
                  <Link
                    href={`/projects/${company.id}?id=${company.id}&title=${company.name}`}
                  >
                    <div className="flex flex-col w-full h-full">
                      <div className="flex-1">
                        <img
                          className="rounded-t-md w-full h-56"
                          src={blobUrls[company.id]}
                          alt={company.name}
                          loading="lazy"
                          // priority={true}
                        />
                      </div>
                      <div className="flex justify-between p-2">
                        <div className="font-medium">
                          <h2>{company.name}</h2>
                          <p className="text-sm text-muted-foreground">
                            Constructed since {company.creationDate.slice(0, 4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-primary absolute top-1/2 left-4 sm:-left-12 transform -translate-y-1/2 z-10" />
      <CarouselNext className="bg-primary absolute top-1/2 right-4 sm:-right-12 transform -translate-y-1/2 z-10" />
    </Carousel>
  );
}
