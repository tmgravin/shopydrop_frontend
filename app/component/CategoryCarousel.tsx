import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TiArrowSortedDown } from "react-icons/ti";

const getRandomImage = () => {
  // Placeholder image service URL (for demo purposes)
  return `https://via.placeholder.com/600x400.png?text=Product${Math.floor(
    Math.random() * 100
  )}`;
};

export function CategoryCarousel() {
  return (
    <Carousel className="w-full shadow-none gap-0">
      <CarouselContent className="w-full -ml-1 shadow-none gap-0 ">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/4 md:basis-1/12 lg:basis-1/16 shadow-none"
          >
            <div className="p-1 h-full shadow-none">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex aspect-square items-center justify-center p-0 shadow-none">
                  <img
                    src={getRandomImage()}
                    alt={`Product ${index + 1}`}
                    className="h-12 w-20"
                  />
                </CardContent>
                <div className="flex items-center text-center justify-end">
                  <p className="text-center text-sm mx-auto">Product</p>
                  <p className="mx-auto">
                    <TiArrowSortedDown size={16} />
                  </p>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
