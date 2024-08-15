"use client";
import React, { useState } from "react";

import { CiHome } from "react-icons/ci";
import { products } from "../utils/products";
import { SidebarItems } from "@/lib/types";
import { ProductCard } from "../component/products/productCard";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { MdFormatListBulleted } from "react-icons/md";
import SavedProduct from "./savedProduct";

const sidebarItems: SidebarItems = {
  Links: [
    { label: "Shop", href: "/shop", icon: <CiHome /> },
    { label: "Buy it again", href: "/buy-again", icon: <PiArrowCounterClockwiseBold size={20}  /> },
    { label: "Saved", href: "/saved", icon: <CiBookmark size={20}  /> },
    { label: "List", href: "/list", icon: <MdFormatListBulleted size={20}  /> },
  ],
};

const VendorStore = () => {
  const [selectedContent, setSelectedContent] = useState("Shop");

  const renderContent = () => {
    switch (selectedContent) {
      case "Shop":
        return (
          <div>
            <img
              src="https://img.freepik.com/free-photo/mexican-dishes-pepper_23-2147740824.jpg?t=st=1722748508~exp=1722752108~hmac=1724aab0600b04c8c7a769177d7392d67dfb8650772325ba5411dcb3bc07cb64&w=1380"
              alt=""
              className="w-full h-[308px]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-14 mb-6">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))
              ) : (
                <p>Loading products...</p>
              )}
            </div>
          </div>
        );
      case "Buy it again":
        return <div>Buy it again content goes here</div>;
      case "Saved":
        return <div>
          <SavedProduct/>

          
        </div>;
      case "List":
        return <div>List content goes here</div>;
        case "List":
          return <div>List content goes here</div>;
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-[20%] bg-gray-100 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <img
              src="path/to/profile-picture.jpg"
              alt="Profile"
              className="w-28 h-28 rounded object-cover"
            />
            <div>
              <p className="text-lg font-bold">Wine Shop</p>
              <p className="text-sm text-gray-500">100% Customer Satisfaction</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedContent("Shop")}
            className="mt-4 w-full bg-black text-white py-2 rounded"
          >
            Shop
          </button>
        </div>
        <div>
          {sidebarItems.Links.map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedContent(item.label)}
              className="flex items-center space-x-2 py-2 text-gray-700 hover:text-black w-full text-left"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-[80%] mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default VendorStore;