"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export function Store() {
  const [vendor, setVendor] = useState<any[]>([]);
  const router = useRouter();

  const fetchUsers = async() => {
    const token = sessionStorage.getItem("token");
    // Fetch users from the API
    axios
      .get(`${baseURL}/api/auth/users/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setVendor(res.data.data); // Set the fetched users to state
        console.log("Fetched users:", res?.data); // Log the fetched data
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };

  useEffect(() => {
    fetchUsers(); // Call the fetchUsers function when the component mounts
  }, []); // Empty dependency array to run only on mount

  const handleCardClick = () => {
    router.push("/vendorstore");
  };

  return (
    <Carousel className="w-full shadow-none gap-0 mt-8">
      <CarouselContent className="w-full -ml-1 shadow-none gap-0">
        {vendor?.map(
          (
            item,
            index // Replace dummy data with fetched vendor data
          ) => (
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
                      src=""
                      alt={`Product ${index + 1}`}
                      width={600} // Using the fixed width from the placeholder image
                      height={400} // Using the fixed height from the placeholder image
                      className="h-20 w-20 rounded-full"
                    />
                  </CardContent>
                  <div className="flex items-center text-center justify-end">
                    <p className="text-center text-sm mx-auto">Name</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
