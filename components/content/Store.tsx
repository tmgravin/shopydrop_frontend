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

  const fetchVendors=()=>{
    const token = sessionStorage.getItem("token");

    axios
      .get(`${baseURL}/api/auth/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const data = res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];
        setVendor(data); // Set the fetched users to state
        console.log("Fetched users:", res?.data); // Log the fetched data
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }

 console.log("Vendors Are", vendor)


  // Fetch users from the API
  useEffect(() => {
    fetchVendors();
  }, []); // Empty dependency array to run only on mount

  const handleCardClick = () => {
    router.push("/vendorstore");
  };

  return (
    <div className="w-full mt-8">
      <Carousel className="w-full shadow-none">
        <CarouselContent className="w-full gap-4 carousel-content">
          {vendor?.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 carousel-item"
            >
              <div className="p-2 h-full">
                <Card
                  className="bg-white border border-gray-200 rounded-lg cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={handleCardClick}
                >
                  <CardContent className="flex flex-col items-center p-4">
                    <Image
                      src={item.imageUrl || "/placeholder.png"} // Replace with real image URL
                      alt={`Vendor ${item.name || `Item ${index + 1}`}`}
                      width={600}
                      height={400}
                      className="rounded-full object-cover w-full h-40"
                    />
                    <p className="mt-2 text-center text-sm font-medium text-gray-800">
                      {item.name || `Name ${index + 1}`}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
