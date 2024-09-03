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
import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import {
  axiosAuthInstance,
  axiosMultipartInstance,
  axiosInstance,
} from "@/app/utils/axiosInstances";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { getUserFromCookies } from "@/app/utils/cookies";

const AddProduct = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Zod
  const [formSchema, setFormSchema] = useState<z.ZodObject<any>>();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  // Category
  const [category, setCategory] = useState<Category[]>([]);

  //Contains URLs of the files/images
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  //Contains files to append for backend
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchedImages, setSearchedImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnail, setThumbnail] = useState<string>("");

  const maxImages = 5;

  // Define Zod Schema
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    category: z
      .string()
      .min(1, { message: "Category is Required" })
      .refine((value) => category.some((cat) => cat.categoryName === value), {
        message: "Invalid category selected",
      }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(100, { message: "Description must be at most 100 characters long " })
      .optional(),
    stock: z.string(),
    price: z.string(),
    // uploadedFiles: z
    //   .array(z.instanceof(File))
    //   .min(1, "You  must upload at least one image")
    //   .max(maxImages, `You can upload a maximum of ${maxImages} images`),
  });

  interface Category {
    categoryId: number;
    categoryName: string;
    createdBy: number;
    updatedAt: number;
  }

  const CategorySchema = z.object({
    categoryId: z.number(),
    categoryName: z.string(),
    createdBy: z.number(),
    updatedAt: z.number(),
  });

  const categoriesSchema = z.array(CategorySchema);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      stock: "",
      price: "",
      // brand: "",
    },
    resolver: zodResolver(schema),
  });

  const user = getUserFromCookies();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageSrcs: string[] = [];
      const newUploadedFiles: File[] = [];
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          alert("Only image files are allowed");
          return;
        }

        // Add the file to the newSelectedFiles array
        newUploadedFiles.push(file);

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
            // Update the selectedFiles state after processing all files
            setUploadedFiles((prevFiles) => [
              ...prevFiles,
              ...newUploadedFiles,
            ]);
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
    // Update selectedFiles
    setUploadedFiles((prevUploadedFiles) => {
      // Remove the actual file at the given index
      return prevUploadedFiles.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axiosInstance.get(
          "/api/lookup/category/category"
        );

        const validatedData = categoriesSchema.parse(response.data);

        setCategory(validatedData);
      } catch (err) {
        console.error("Error Fetching Category", err);
      }
    }
    fetchCategory();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append("images", file);
        console.log("Selected File:", file);
      });
    }

    if (searchedImages.length > 0) {
      searchedImages.forEach((file) => {
        formData.append("images", file);
        console.log("SearchedImages:", file);
      });
    }

    console.log("selected Files:", uploadedFiles);
    console.log("searched Files", searchedImages);

    formData.append("productName", data.name);
    // formData.append("category", data.category);
    // formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("vendorId", user.user.id);
    formData.append("stock", data.stock);
    formData.append("price", data.price);

    console.log(formData);

    // Sending Data
    axiosMultipartInstance
      .post("/api/product/products", formData)
      .then((response) => console.log(response))
      .catch((err) => console.error("Error sending data", err));

    console.log(formData);
  };

  const getProducts = () => {
    axiosInstance
      .get("/api/product/products/")
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
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
          <div>
            <Button onClick={getProducts}>Get Products</Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`h-full  ${
                isSidebarOpen
                  ? "grid-cols-1 2xl:grid-cols-2"
                  : " xl:grid-cols-2"
              } grid  gap-[20px] 
             
            `}
            >
              <Card className="flex flex-col gap-5">
                {/* Input for Product Name */}
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
                  {errors.name && (
                    <p className="error">{errors.name.message as string}</p>
                  )}
                  <p className=" text-xs sm:text-sm text-muted-foreground mt-2 ">
                    Do not exceed 20 characters when entering the product name.{" "}
                  </p>
                </div>
                {/* Select Option for Category */}
                <div className="flex flex-col gap-2">
                  <Label className=" text-base sm:text-lg font-semibold">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("category", value);
                      trigger("category");
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {category.map((value) => (
                          <SelectItem
                            key={value.categoryName}
                            value={value.categoryName}
                          >
                            {value.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="error">{errors.category.message as string}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Stock
                  </Label>
                  <Input
                    {...register("stock")}
                    type="text"
                    placeholder=""
                    className="mt-2"
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message as string}</p>
                  )}
                </div>
                {/* Price */}
                <div>
                  <Label className="text-base sm:text-lg font-semibold">
                    Price
                  </Label>
                  <Input
                    {...register("price")}
                    type="text"
                    placeholder=""
                    className="mt-2"
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message as string}</p>
                  )}
                </div>

                {/* Select Option for Brand */}
                <div className="grid gap-2">
                  <Label className="text-lg font-semibold">
                    Brand
                    <span className="font-light text-sm"> (Optional)</span>
                  </Label>
                  {/* <Select onValueChange={(value) => setValue("brand", value)}> */}
                  <Select>
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
                {/* Description textarea */}
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
                  {errors.description && (
                    <p className="error">
                      {errors.description.message as string}
                    </p>
                  )}
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
                  {/* Placeholder when there is no image */}
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
                          style={{ objectFit: "contain" }}
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
                        {/* Button for selecting the image as thumbnail */}
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
                {/* Diplay All Images in grid */}
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
                    {/* Placeholder when there is no image */}
                    {imageSrcs.length === 0 ? (
                      <div className="flex justify-center items-center text-center w-full h-40 bg-gray-200">
                        <p className="text-gray-500 ">No images available</p>
                      </div>
                    ) : (
                      // When you have images display in grid
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
                            style={{ objectFit: "contain" }}
                            className="p-2 border-2 hover:bg-secondary rounded-xl duration-200 "
                          />
                          {/* When the Image is a thumbnail overlay with camera icon */}
                          {src === thumbnail ? (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-25 backdrop-filter backdrop-blur-sm">
                              <ImCamera className=" h-full w-2/3 opacity-40 text-gray-300 " />
                            </div>
                          ) : null}
                          {/* Keep Close X Button for every image */}
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
                  {/* Options for uploading Images */}
                  <div
                    className={`${
                      isSidebarOpen
                        ? "flex-col lg:flex-row"
                        : " flex-col sm:flex-row sm:items-center"
                    } flex  py-10 gap-5  mt-5`}
                  >
                    {/* Add Image by Uploading */}
                    <Button
                      className="flex gap-1 items-center max-w-60  "
                      onClick={handleButtonClick}
                      type="button"
                    >
                      <IoMdAddCircleOutline className=" text-xl sm:text-2xl" />
                      Add Image
                    </Button>
                    {/* Add Image by Searching */}
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <IoSearch className="text-xl sm:text-2xl" />
                            <p>Search For Product Images</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="">
                          <ProductSearch
                            imageSrcs={imageSrcs}
                            setImageSrcs={setImageSrcs}
                            searchedImages={searchedImages}
                            setSearchedImages={setSearchedImages}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {/* Upload Button that is hidden and given reference*/}
                  <input
                    // {...register("files")}
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />{" "}
                </div>

                {/* Pick Date for Product */}
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
                          type="button"
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

                {/* Save Options */}
                <div
                  className={`${
                    isSidebarOpen
                      ? "flex-col lg:flex-row"
                      : "flex-col sm:flex-row"
                  } flex  gap-5`}
                >
                  {/* Final Add Product Button */}
                  <Button type="submit">Add Product</Button>
                  {/* Save Product Button */}
                  <Button
                    variant={"outline"}
                    className=" hover:border-primary hover:text-primary flex items-center gap-1"
                  >
                    <FaRegBookmark className="text-lg sm:text-xl" />
                    Save Product
                  </Button>
                  {/* Schedule Product Button */}
                  <Button
                    variant={"outline"}
                    className="flex items-center gap-1  hover:border-yellow-600 hover:text-yellow-600"
                  >
                    <MdOutlineSchedule className="text-lg sm:text-xl" />
                    Schedule
                  </Button>
                </div>
              </Card>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddProduct;
