import * as React from "react";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import { TiArrowSortedDown } from "react-icons/ti";
import apiutils from "@/app/utils/apiutils";


const getRandomImage = () => {
  apiutils.get("/api/lookup/category/category")
  .then((response) =>
  {
    response.data
    console.log("data",response)
    
  })
  // Placeholder image service URL (for demo purposes)
  return `https://via.placeholder.com/600x400.png?text=Product${Math.floor(
    Math.random() * 100
  )}`;
};

export function CategoryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const carousel = carouselRef.current as unknown as { next: () => void };
        carousel.next();
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <Carousel ref={carouselRef} className="w-full shadow-none gap-0">
      <CarouselContent className="w-full flex gap-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex-none p-1 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
          >
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="flex aspect-square items-center justify-center p-0 shadow-none">
                <Image
                  src={getRandomImage()}
                  width={80}
                  height={80}
                  alt={`Product ${index + 1}`}
                  className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full"
                />
              </CardContent>
              <div className="flex items-center text-center justify-between mt-1">
                <p className="text-center text-xs sm:text-sm mx-auto">
                  Category Name
                </p>
                <TiArrowSortedDown size={14} />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
