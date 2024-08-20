"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Static data
const vendorCardData = [
  {
    storeName: "Kirana Pasal",
    description: "Alcohol Groceries",
    buttonText: "Shop Now",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "Pasal image",
  },
  {
    storeName: "Kirana Pasal",
    description: "Alcohol Groceries",
    buttonText: "Shop Now",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "Pasal image",
  },
  {
    storeName: "Kirana Pasal",
    description: "Alcohol Groceries",
    buttonText: "Shop Now",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "Pasal image",
  },
  {
    storeName: "Kirana Pasal",
    description: "Alcohol Groceries",
    buttonText: "Shop Now",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "Pasal image",
  },
];

export function VendorCard({ className, ...props }: { className?: string }) {
  return (
    <div className="flex gap-4 mb-16">
      {vendorCardData.map((vendor, index) => (
        <Card
          key={index}
          className={cn("relative w-[331px] h-[183.8px] mt-5", className)}
          {...props}
        >
          <div className="bg-green-600 rounded-full w-12 h-12 ml-2 mt-2">
            <img
              className="object-cover rounded-full h-12 w-12 left-0 items-start text-start"
              src={vendor.logoUrl}
              alt={vendor.storeName}
            />
          </div>
          <div className="flex justify-between">
            <div className="mx-2 space-y-1">
              <h1 className="font-bold">{vendor.storeName}</h1>
              <p>{vendor.description}</p>
              <Button className="bg-green-600 w-[144px] h-[34px]">
                {vendor.buttonText}
              </Button>
            </div>
          </div>
          <img
            className="absolute bottom-0 right-0 w-[141px] h-[138.8px] object-cover"
            src={vendor.imageUrl}
            alt={vendor.altText}
          />
        </Card>
      ))}
    </div>
  );
}
