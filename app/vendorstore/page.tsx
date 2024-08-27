// "use client";
// import React, { useState } from "react";
// import { CiHome } from "react-icons/ci";
// import { products } from "../utils/products";
// import { SidebarItems } from "@/lib/types";
// import { ProductCard } from "../../components/products/productCard";
// import { PiArrowCounterClockwiseBold } from "react-icons/pi";
// import { CiBookmark } from "react-icons/ci";
// import { MdFormatListBulleted } from "react-icons/md";
// import SavedProduct from "./savedProduct";
// import Image from "next/image";

// const sidebarItems: SidebarItems = {
//   Links: [
//     { label: "Shop", href: "/shop", icon: <CiHome size={20} /> },
//     { label: "Buy it again", href: "/buy-again", icon: <PiArrowCounterClockwiseBold size={20} /> },
//     { label: "Saved", href: "/saved", icon: <CiBookmark size={20} /> },
//     { label: "List", href: "/list", icon: <MdFormatListBulleted size={20} /> },
//   ],
// };

// const VendorStore = () => {
//   const [selectedContent, setSelectedContent] = useState("Shop");

//   const renderContent = () => {
//     switch (selectedContent) {
//       case "Shop":
//         return (
//           <div>
//             <Image
//               src="https://img.freepik.com/free-photo/mexican-dishes-pepper_23-2147740824.jpg?t=st=1722748508~exp=1722752108~hmac=1724aab0600b04c8c7a769177d7392d67dfb8650772325ba5411dcb3bc07cb64&w=1380"
//               alt=""
//               width={100}
//             height={100}
//               className="w-full h-[308px] object-cover rounded-md shadow-lg"
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 mb-6">
//               {products && products.length > 0 ? (
//                 products.map((product) => (
//                   <ProductCard key={product.id} data={product} />
//                 ))
//               ) : (
//                 <p className="text-center col-span-5 text-gray-500">Loading products...</p>
//               )}
//             </div>
//           </div>
//         );
//       case "Buy it again":
//         return <div>Buy it again content goes here</div>;
//       case "Saved":
//         return (
//           <div>
//             <SavedProduct />
//           </div>
//         );
//       case "List":
//         return <div>List content goes here</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row w-full bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-full lg:w-[20%] bg-white p-6 shadow-md rounded-md">
//         <div className="mb-8 text-center">
//           <Image
//             src="https://www.merokirana.com/archive/KiranaProduct/823a4c95372341cfb99b25ef66f39e03.jpg"
//             alt="Profile"
//             width={100}
//             height={100}
//             className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg"
//           />
//           <div className="mt-4">
//             <p className="text-xl font-bold text-gray-700">Wine Shop</p>
//             <p className="text-sm text-gray-500">100% Customer Satisfaction</p>
//           </div>
//         </div>
//         <div className="space-y-4">
//           {sidebarItems.Links.map((item) => (
//             <button
//               key={item.label}
//               onClick={() => setSelectedContent(item.label)}
//               className={`flex items-center space-x-3 py-3 w-full text-left rounded-md transition-colors ${
//                 selectedContent === item.label ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-100 hover:text-black"
//               }`}
//             >
//               {item.icon}
//               <span className="text-md">{item.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full lg:w-[80%] p-6 lg:pl-8">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default VendorStore;

"use client";
import VendorStore from './../../components/vendoreStore/VendorStore';

const VendorStorePage = () => {
  return <VendorStore />;
};

export default VendorStorePage;