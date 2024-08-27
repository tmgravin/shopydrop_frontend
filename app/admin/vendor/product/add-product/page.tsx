"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

import ProductSearch from "@/components/ProductSearch";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import { FaChevronRight, FaRegBookmark } from "react-icons/fa6";
import { ImCamera } from "react-icons/im";
import { MdOutlineSchedule } from "react-icons/md";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { IoSearch } from "react-icons/io5";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState<string>("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageSrcs: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImageSrcs.push(e.target.result as string);
          }
          // Update the state after reading all files
          if (newImageSrcs.length === files.length) {
            setImageSrcs((prevImageSrcs) => {
              const updatedImageSrcs = [...prevImageSrcs, ...newImageSrcs];
              // Set the thumbnail to the first image if it's not seen yet
              if (!thumbnail) {
                setThumbnail(updatedImageSrcs[0]);
              }
              return updatedImageSrcs;
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSetAsMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const handleRemoveImage = (index: number) => {
    setImageSrcs((prevImageSrcs) => {
      // Remove the image at the given index
      const updatedImageSrcs = prevImageSrcs.filter((_, i) => i !== index);

      // If the removed image was the current thumbnail
      if (index === mainImageIndex) {
        // Update the main image index
        const newMainImageIndex = Math.min(
          mainImageIndex,
          updatedImageSrcs.length - 1
        );

        // Set the new thumbnail to the first image if there are any left
        const newThumbnail =
          updatedImageSrcs.length > 0 ? updatedImageSrcs[0] : "";

        // Update state
        setMainImageIndex(newMainImageIndex);
        setThumbnail(newThumbnail);
      }

      return updatedImageSrcs;
    });
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    if (data.files && data.files.length > 0) {
      for (const files of data.files) {
        formData.append("files[]", files);
      }
    }
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("description", data.description);

    console.log(formData);
  };

  return (
    <div>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col  py-10">
          <h1 className="text-xl sm:text-2xl font-semibold">Add Product</h1>

          <div className="py-10">
            <div className="flex gap-4 items-baseline font-medium">
              <Link
                href={"/admin/vendor/product/product-list"}
                className=" hover:text-primary"
              >
                Product
              </Link>{" "}
              <FaChevronRight /> <p className="text-gray-500">Add</p>
            </div>
          </div>

          <div
            className={`h-full  ${
              isSidebarOpen ? "grid-cols-1 2xl:grid-cols-2" : " xl:grid-cols-2"
            } grid  gap-[20px] 
             
            `}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="flex flex-col gap-5">
                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Product Name
                  </Label>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Enter your product Name"
                    className="mt-2"
                  />
                  <p className=" text-xs sm:text-sm text-muted-foreground mt-2 ">
                    Do not exceed 20 characters when entering the product name.{" "}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className=" text-base sm:text-lg font-semibold">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="phone">phone</SelectItem>
                        <SelectItem value="accessory">accessory</SelectItem>
                        <SelectItem value="dairy">dairy</SelectItem>
                        <SelectItem value="snacks">snacks</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-lg font-semibold">Brand</Label>
                  <Select onValueChange={(value) => setValue("brand", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brand</SelectLabel>
                        <SelectItem value="apple">apple</SelectItem>
                        <SelectItem value="google">google</SelectItem>
                        <SelectItem value="microsoft">microsoft</SelectItem>
                        <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-base sm:text-lg font-semibold">
                    Description
                  </Label>
                  <Textarea
                    {...register("description")}
                    placeholder="Description"
                    id="description"
                    className="resize-none"
                    rows={6}
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Do not exceed 100 characters.{" "}
                  </p>
                </div>
              </Card>

              <Card className="grid gap-5 ">
                {/* Thumbnail */}
                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Product Image
                  </Label>
                  {imageSrcs.length === 0 ? (
                    <div className="  mt-3 grid grid-cols-1 sm:grid-cols-2 ">
                      <p className="text-gray-500 h-60 flex items-center justify-center text-center bg-gray-200 ">
                        No images available
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`${
                        isSidebarOpen
                          ? "grid-cols-1 lg:grid-cols-2"
                          : "sm:grid-cols-2"
                      } grid  gap-5  mt-3`}
                    >
                      <div className="relative w-full h-60 ">
                        <Image
                          src={imageSrcs[mainImageIndex]}
                          alt={`Uploaded`}
                          fill
                          objectFit="contain"
                          className="p-5 border-2 hover:bg-secondary rounded-xl duration-200 "
                        />
                      </div>
                      <div
                        className={` flex items-center ${
                          isSidebarOpen
                            ? "lg:justify-center"
                            : "sm:justify-center"
                        } `}
                      >
                        <Button
                          className="max-w-60 flex items-center gap-3  "
                          onClick={() =>
                            setThumbnail(imageSrcs[mainImageIndex])
                          }
                        >
                          <p>Set as Thumbnail</p>
                          <ImCamera className=" text-2xl " />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Image Gallery   */}
                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Product Gallery
                  </Label>
                  <div
                    className={`${
                      isSidebarOpen
                        ? "md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                        : " grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4"
                    } grid  gap-5 mt-3 max-h-56 overflow-auto`}
                  >
                    {imageSrcs.length === 0 ? (
                      <div className="flex justify-center items-center text-center w-full h-40 bg-gray-200">
                        <p className="text-gray-500 ">No images available</p>
                      </div>
                    ) : (
                      imageSrcs.map((src, index) => (
                        <div
                          className={`relative w-full h-24 cursor-pointer hover:scale-105 duration-100 }`}
                          onClick={() => handleSetAsMainImage(index)}
                          key={index}
                        >
                          <Image
                            src={src}
                            alt={`Uploaded ${index}`}
                            fill
                            objectFit="contain"
                            className="p-2 border-2 hover:bg-secondary rounded-xl duration-200 "
                          />
                          {src === thumbnail ? (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm">
                              <ImCamera className=" h-full w-2/3 opacity-40 text-gray-300 " />
                            </div>
                          ) : null}
                          <button
                            className="absolute top-2 right-2 bg-primary rounded-full p-2 text-white z-10 hover:bg-red-700 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            <FaTimes className="  text-xs" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div
                    className={`${
                      isSidebarOpen
                        ? "flex-col lg:flex-row"
                        : " flex-col sm:flex-row sm:items-center"
                    } flex  py-10 gap-5  mt-5`}
                  >
                    <Button
                      className="flex gap-1 items-center max-w-60  "
                      onClick={handleButtonClick}
                    >
                      <IoMdAddCircleOutline className=" text-xl sm:text-2xl" />
                      Add Image
                    </Button>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="flex items-center gap-2"
                          >
                            <IoSearch className="text-xl sm:text-2xl" />
                            <p>Search For Product Images</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="">
                          <ProductSearch
                            imageSrcs={imageSrcs}
                            setImageSrcs={setImageSrcs}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {/* Upload Button */}
                  <input
                    {...register("files")}
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />{" "}
                </div>

                {/* <h1>Open Food Facts Product Search</h1> */}

                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Product Date
                  </Label>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-60 sm:w-[280px] flex justify-between my-2 font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div
                  className={`${
                    isSidebarOpen
                      ? "flex-col lg:flex-row"
                      : "flex-col sm:flex-row"
                  } flex  gap-5`}
                >
                  <Button type="submit">Add Product</Button>
                  <Button
                    variant={"outline"}
                    className=" hover:border-primary hover:text-primary flex items-center gap-1"
                  >
                    <FaRegBookmark className="text-lg sm:text-xl" />
                    Save Product
                  </Button>
                  <Button
                    variant={"outline"}
                    className="flex items-center gap-1  hover:border-yellow-600 hover:text-yellow-600"
                  >
                    <MdOutlineSchedule className="text-lg sm:text-xl" />
                    Schedule
                  </Button>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddProduct;
