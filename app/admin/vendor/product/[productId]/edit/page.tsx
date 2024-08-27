"use client";
import React, { useRef, useState } from "react";
import { products, Product, Review, Image as img } from "@/app/utils/products";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegEdit, FaTimes } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProductSearch from "@/components/ProductSearch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoSearch } from "react-icons/io5";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
interface PageProps {
  params: {
    productId: string;
  };
}

const EditProduct = ({ params }: PageProps) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { productId } = params;

  const product = products.find((product) => product.id === productId);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            setImageSrcs((prevImageSrcs) => [
              ...prevImageSrcs,
              ...newImageSrcs,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveSelectedImage = (index: number) => {
    setImageSrcs((prevImagesSrcs) => {
      return prevImagesSrcs.filter((_, i) => i !== index);
    });
  };

  return (
    <div>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col  py-10 ">
          <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Product Details
            </h1>
            <div className="max-w-40">
              <Link
                href={"/admin/vendor/product/add-product"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-1 items-center"
                )}
              >
                <IoMdAddCircleOutline className="text-xl sm:text-2xl" />
                Add Product
              </Link>
            </div>
          </div>
          <div className="pt-10 pb-10">
            <div className="flex gap-4 items-baseline font-medium">
              <Link
                href={"/admin/vendor/product/product-list"}
                className=" hover:text-primary"
              >
                Product
              </Link>{" "}
              <FaChevronRight className="shrink-0" />{" "}
              <Link
                href={`/admin/vendor/product/${product?.id}`}
                className=" hover:text-primary truncate"
              >
                {product?.name}
              </Link>{" "}
              <FaChevronRight className="shrink-0" />{" "}
              <p className="text-gray-500">Edit</p>
            </div>
          </div>

          <Card className="flex flex-col gap-5 ">
            <h1 className="text-xl sm:text-2xl font-medium border-b-2 pb-2 ">
              About Product
            </h1>
            <div
              className={`${
                isSidebarOpen
                  ? "grid-cols-1 xl:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2"
              } grid  gap-[5%] gap-y-6 justify-between items-center`}
            >
              <div>
                <label className="font-semibold">Product Name</label>
                <Input type="text" value={product?.name} className="mt-2" />
              </div>
              <div>
                <label className="font-semibold">Sub Text</label>
                <Input type="text" value={""} className="mt-2" />
              </div>
              <div>
                <label className="font-semibold">Category</label>
                <Input
                  type="text"
                  placeholder="Fruit"
                  value={product?.category}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="font-semibold">Brand</label>
                <Input type="text" value={product?.brand} className="mt-2" />
              </div>
              <Card className="flex flex-col gap-5">
                <h1 className="font-semibold">Price</h1>
                <div className="grid md:grid-cols-2 gap-[5%]">
                  <div>
                    <label className="font-medium ">Price</label>
                    <Input type="text" className="mt-2" />
                  </div>
                  <div>
                    <label className="font-medium ">Old Price</label>
                    <Input
                      type="text"
                      value={`Rs ${product?.price}`}
                      className="mt-2"
                      disabled
                    />
                  </div>
                  <Link
                    href={"/"}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "mt-2 flex justify-start"
                    )}
                  >
                    Schedule Discount
                  </Link>
                </div>
              </Card>
              <Card className="h-full">
                <h1 className="font-semibold">Visibility</h1>

                <RadioGroup
                  defaultValue={product?.visibility}
                  className="mt-5 flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="published"
                      id="r1"
                      className=" size-5"
                    />
                    <Label htmlFor="r1">Published</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="scheduled"
                      id="r2"
                      className=" size-5"
                    />
                    <Label htmlFor="r2">Scheduled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="hidden"
                      id="r3"
                      className=" size-5"
                    />
                    <Label htmlFor="r3">Hidden</Label>
                  </div>
                </RadioGroup>
              </Card>
            </div>

            <h1 className="text-xl sm:text-2xl font-medium">
              Product Description
            </h1>
            <Card>
              <p className="text-xs sm:text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                molestiae, iste nesciunt illo sint animi ipsam aut perspiciatis
                officia dolore neque odit accusamus totam sequi et eum
                asperiores commodi corrupti.
              </p>
            </Card>

            <div className="">
              <label className="font-medium "> Meta Title</label>
              <Input type="text" className="mt-2" />
            </div>
            <div className="">
              <label className="font-medium ">Meta Keyword</label>
              <Input type="text" className="mt-2" />
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-xl sm:text-2xl font-medium">Upload Image</h1>
              <div
                className={`${
                  isSidebarOpen
                    ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                } grid  gap-5 border-b-2 pb-4`}
              >
                {product?.images.map((item, index) => (
                  <div className="relative w-full h-40 " key={index}>
                    <Image
                      src={`${product?.images[index].image}`}
                      alt={""}
                      fill
                      objectFit="contain"
                      className="p-5 border-2 hover:bg-secondary rounded-xl duration-200 "
                    />
                    <button className="absolute top-2 right-2 bg-primary rounded-full p-2 text-white z-10 hover:bg-red-700 hover:text-white">
                      <FaTimes className="  text-xs" />
                    </button>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  isSidebarOpen
                    ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                } grid gap-5 w-full max-h-64 overflow-auto`}
              >
                {imageSrcs.map((src, index) => (
                  <div key={index} className="relative h-40 w-full">
                    <Image
                      src={src}
                      alt={`Uploaded ${index}`}
                      fill
                      objectFit="contain"
                      className="p-5 border-2 hover:bg-secondary rounded-xl duration-200 "
                    />
                    <button
                      className="absolute top-2 right-2 bg-primary rounded-full p-2 text-white z-10 hover:bg-red-700 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSelectedImage(index);
                      }}
                    >
                      <FaTimes className="  sm:text-xs" />
                    </button>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  isSidebarOpen
                    ? "flex-col"
                    : "flex-col sm:flex-row sm:items-center"
                } flex  gap-5 mt-5`}
              >
                <Button
                  className="flex gap-1 items-center max-w-60 "
                  onClick={handleButtonClick}
                >
                  <IoMdAddCircleOutline className="text-xl sm:text-2xl" />
                  Add Another Image
                </Button>
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <div
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "flex items-center gap-2"
                        )}
                      >
                        <IoSearch className="text-xl sm:text-2xl" />
                        <p>Search for Product Images</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <ProductSearch
                        imageSrcs={imageSrcs}
                        setImageSrcs={setImageSrcs}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
              />
              <Card className="flex gap-3 mt-20">
                <Button>Save</Button>
                <Button variant={"destructive"}>Cancel</Button>
              </Card>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default EditProduct;
