"use client";
import React from "react";
import { products, Product, Review, Image as img } from "@/app/utils/products";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useSidebar } from "@/components/SidebarProvider";
interface PageProps {
  params: {
    productId: string;
  };
}

const ProductDetails = ({ params }: PageProps) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { productId } = params;

  const product = products.find((product) => product.id === productId);

  return (
    <div>
      <div className="mx-auto px-2.5 md:px-20 w-full">
        <div className="flex flex-col  py-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
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
          <div className="py-10">
            <div className="flex gap-4 items-baseline font-medium">
              <Link
                href={"/admin/vendor/product/product-list"}
                className=" hover:text-primary"
              >
                Product
              </Link>{" "}
              <FaChevronRight className="shrink-0" />{" "}
              <p className="text-gray-500 truncate">{product?.name}</p>
            </div>
          </div>
          <Card className="flex flex-col gap-2 ">
            <div className="flex  flex-col-reverse gap-x-5 gap-y-5 sm:flex-row items-start justify-between ">
              <div>
                <h1 className="text-xl sm:text-2xl font-medium">
                  {product?.name}
                </h1>
                <p className=" text-xs sm:text-sm pt-2">{product?.category}</p>
              </div>
              <div className="flex items-center  gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/product/${product?.id}/edit`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          ""
                        )}
                      >
                        {" "}
                        <FaRegEdit className="text-xl sm:text-2xl" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          buttonVariants({ variant: "destructive" }),
                          ""
                        )}
                      >
                        {" "}
                        <RiDeleteBinLine className="text-xl sm:text-2xl" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div
              className={`grid grid-cols-3 items-center  gap-x-20 gap-y-10 mt-2`}
            >
              <div
                className={`${
                  isSidebarOpen ? "col-span-" : "col-span-3 lg:col-span-1"
                } flex justify-center relative w-full h-96`}
              >
                <Image
                  src={product?.images[0].image || "/apple.jpg"}
                  fill
                  alt={product?.name || "Default Product"}
                  objectFit="contain"
                />
              </div>
              <div
                className={`${isSidebarOpen ? "" : "col-span-3 lg:col-span-2"}`}
              >
                <h1 className="text-base sm:text-lg font-medium">
                  Description
                </h1>
                <p className="mt-2">{product?.description}</p>
                <p className="text-lg sm:text-xl font-medium mt-5">
                  Rs {product?.price}{" "}
                  <span className="text-primary">
                    ({product?.discount}% off)
                  </span>
                </p>
                <h1 className="text-base sm:text-lg font-semibold mt-5">
                  Key Highlights
                </h1>
                <ul className="mt-3">
                  {product?.highlights.map((item, index) => (
                    <li className="flex items-center gap-1" key={index}>
                      <TiTick className="text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-medium mt-8">
                General Info
              </h1>
              <ul className="flex flex-col gap-5 mt-5">
                {product?.info.map((item, index) => (
                  <li key={index} className="py-2 border-b-2">
                    {item}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
