"use client";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { RiSave3Line } from "react-icons/ri";

// const images = {
//   hero: "/apple.jpg",
//   other: "/user.png",
// };

const UpdateImages = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [displayImage, setDisplayImage] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setDisplayImage(imageUrl);
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(`http://localhost:3000/api/images`);
        const { hero, others } = response.data;
        setImages({ hero, others });

        if (selectedCategory) {
          setDisplayImage(
            response.data[selectedCategory] || "/placeholder.png"
          );
        }
      } catch (err) {
        console.error("Error while fetching images", err);
      }
    }
    fetchImage();
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSaveClick = async () => {
    if (!selectedCategory || !file) return;
    const formData = new FormData();
    formData.append(selectedCategory, file);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error("Error handling Save", err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col gap-14 py-10">
          <h1 className="text-xl sm:text-2xl font-semibold">Featured Images</h1>
          <Card className="flex flex-col gap-5">
            <h2 className="text-base sm:text-lg font-medium">
              Update Featured Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="relative  h-80 w-full ">
                <Image
                  src={displayImage || "/placeholder.png"}
                  style={{ objectFit: "contain" }}
                  alt="Featured Image"
                  className="border-2 p-5 rounded-xl "
                  fill
                />
              </div>

              <div className="">
                <h2 className="text-sm sm:text-base font-medium">
                  Pick a Category
                </h2>

                <div className="max-w-52 mt-2">
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Section Image</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleButtonClick}
                  className="max-w-52 flex items-center gap-2 mt-5"
                  disabled={!selectedCategory}
                >
                  <FaRegFileImage className=" text-lg sm:text-xl" />
                  <p className="text-xs sm:text-sm">Choose Image</p>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mt-10">
              <Button
                onClick={handleSaveClick}
                disabled={!selectedCategory || !displayImage}
                className="max-w-40 flex items-center gap-2"
              >
                <RiSave3Line className="text-xl sm:text-2xl" />
                <p className="text-sm sm:text-base">Save</p>
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default UpdateImages;
