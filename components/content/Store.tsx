"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const getRandomImage = () => {
  return `https://via.placeholder.com/600x400.png?text=Product${Math.floor(
    Math.random() * 100
  )}`;
};

export function Store() {
  const [vendor, setVendor] = useState<any[]>([]); 
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in first.");
        return;
      }
      const res = await axios.get(`${baseURL}/api/auth/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setVendor(res.data);
      console.log("Fetched users:", res.data); 
    } catch (err) {
      console.error("Error fetching users:", err); 
    }
  };
  
  useEffect(() => {
    fetchUsers(); 
  }, []); 
  

  const handleCardClick = () => {
    router.push('/vendorstore');
  };

  return (
    <Carousel className="w-full shadow-none gap-0 mt-8">
      <CarouselContent className="w-full -ml-1 shadow-none gap-0">
        {vendor.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/4 md:basis-1/12 lg:basis-1/16"
          >
            <div className="p-1 h-full">
              <Card
                className="bg-transparent border-none bg-green-300 cursor-pointer"
                onClick={handleCardClick}
              >
                <CardContent className="flex aspect-square items-center justify-center p-0 shadow-none">
                  <Image
                    src={getRandomImage()}
                    alt={`Product ${index + 1}`}
                    width={600}
                    height={400}
                    className="h-20 w-20 rounded-full"
                  />
                </CardContent>
                <div className="flex items-center text-center justify-end">
                  <p className="text-center text-sm mx-auto">{item.name}</p>
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
