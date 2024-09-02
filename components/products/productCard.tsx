// "use client";

// import { FormatPrice } from "@/app/utils/formatPrice";
// import { truncateText } from "@/app/utils/truncateText";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Rating } from '@mui/material';
// import { TiEye } from "react-icons/ti";
// import { FaHeart } from "react-icons/fa";
// import SetQuantity from "@/app/product/[productid]/setQuantity";
// import { useCart } from "@/app/hooks/useCart";

// import Image from "next/image";

// interface ProductCardProps {
//   data: {
//     id: string;
//     images: { image: string }[];
//     name: string;
//     price: number;
//   };
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
//   const [savedProducts, setSavedProducts] = useState<string[]>([]);
//   const router = useRouter();
//   const { handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

//   const handleSaveProduct = (productId: string) => {
//     setSavedProducts((prevSavedProducts) =>
//       prevSavedProducts.includes(productId)
//         ? prevSavedProducts.filter(id => id !== productId)
//         : [...prevSavedProducts, productId]
//     );
//   };

//   return (
//     <div className="relative border border-slate-200 rounded-md p-4 transition-transform duration-200 hover:scale-105 text-sm group bg-white shadow-md">
//       {/* Hover Icons */}
//       <div className="absolute top-2 right-2 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//         <TiEye onClick={() => router.push(`/product/${data.id}`)} className="text-gray-600 hover:text-blue-500" size={24} />
//         <FaHeart
//           onClick={() => handleSaveProduct(data.id)}
//           className={`text-gray-600 hover:text-blue-500 ${savedProducts.includes(data.id) ? 'text-red-500' : ''}`}
//           size={24}
//         />
//       </div>

//       {/* Product Image */}
//       <div className="relative aspect-square w-full overflow-hidden mb-2">
//         <Image
//           src={data.images?.[0]?.image || 'default-image-url'}
//           alt={data.name || 'Product image'}
//           className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
//           width={100}
//           height={100}
//         />
//       </div>

//       {/* Product Details */}
//       <h3 className="font-semibold mb-1">{truncateText(data.name)}</h3>
//       <p className="text-xl font-bold mb-1">In Stock</p>
//       <div className="flex items-center mb-2">
//         <Rating value={3.5} readOnly />
//       </div>
//       <div className="flex justify-between items-center mb-3">
//         <p className="font-bold">{FormatPrice(data.price)}</p>
//         <SetQuantity
//           cartCounter={true}
//           cartProduct={data}
//           handleQtyIncrease={() => handleCartQtyIncrease(data.id)}
//           handleQtyDecrease={() => handleCartQtyDecrease(data.id)}
//         />
//       </div>
//       <div className="flex justify-center">
//         <Button className="bg-green-600 text-white hover:bg-green-700 transition-colors w-full">
//           Add To Cart
//         </Button>
//       </div>
//     </div>
//   );
// };

"use client";

import { FormatPrice } from "@/app/utils/formatPrice";
import { truncateText } from "@/app/utils/truncateText";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Rating } from '@mui/material';
import { TiEye } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import SetQuantity from "@/app/product/[productid]/setQuantity";
import { useCart } from "@/app/hooks/useCart";
import Image from "next/image";
import axios from "axios";

interface ProductCardProps {
  data: {
    id: string;
    images: { image: string }[];
    name: string;
    price: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const router = useRouter();
  const { handleCartQtyIncrease, handleCartQtyDecrease } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products/${data.id}`)
      .then((response) => {
        console.log("Product fetched successfully:", response.data);
        setProduct(response.data);
      })
      .catch((error: any) => {
        console.error("Error fetching product:", error);
      });
  }, [data.id]);

  const handleSaveProduct = (productId: string) => {
    setSavedProducts((prevSavedProducts) =>
      prevSavedProducts.includes(productId)
        ? prevSavedProducts.filter(id => id !== productId)
        : [...prevSavedProducts, productId]
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative border border-slate-200 rounded-md p-4 transition-transform duration-200 hover:scale-105 text-sm group bg-white shadow-md">
      <div className="absolute top-2 right-2 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TiEye onClick={() => router.push(`/product/${data.id}`)} className="text-gray-600 hover:text-blue-500" size={24} />
        <FaHeart
          onClick={() => handleSaveProduct(data.id)}
          className={`text-gray-600 hover:text-blue-500 ${savedProducts.includes(data.id) ? 'text-red-500' : ''}`}
          size={24}
        />
      </div>

      <div className="relative aspect-square w-full overflow-hidden mb-2">
        <Image
          src={product.images?.[0]?.image || 'default-image-url'}
          alt={product.name || 'Product image'}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          width={100}
          height={100}
        />
      </div>

      <h3 className="font-semibold mb-1">{truncateText(product.name)}</h3>
      <p className="text-xl font-bold mb-1">In Stock</p>
      <div className="flex items-center mb-2">
        <Rating value={3.5} readOnly />
      </div>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">{FormatPrice(product.price)}</p>
        <SetQuantity
          cartProduct={product}
          handleQtyIncrease={() => handleCartQtyIncrease(product.id)}
          handleQtyDecrease={() => handleCartQtyDecrease(product.id)}
          cartCounter={true}
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-green-600 text-white hover:bg-green-700 transition-colors w-full">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};
