// ProductCard.tsx

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { FormatPrice } from "@/app/utils/formatPrice";
import { truncateText } from "@/app/utils/truncateText";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Rating } from '@mui/material';
import { TiEye } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import SetQuantity from "@/app/product/[productid]/setQuantity";
import { useCart } from "@/app/hooks/useCart";

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
  const { handleAdProductToCart } = useCart();

  const debouncedAddToCart = useCallback(
    debounce(() => {
      handleAdProductToCart(data);
    }, 300), // Adjust debounce time as needed
    [data, handleAdProductToCart]
  );

  const handleSaveProduct = (productId: string) => {
    setSavedProducts((prevSavedProducts) => {
      if (prevSavedProducts.includes(productId)) {
        return prevSavedProducts.filter(id => id !== productId);
      } else {
        return [...prevSavedProducts, productId];
      }
    });
  };

  return (
    <div className="relative col-span-1 cursor-pointer border-b-[1px] border border-slate-200 rounded-sm p-2 transition hover:scale-105 text-sm group">
      <div className="absolute top-12 right-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
        <TiEye onClick={() => router.push(`/product/${data.id}`)} className="text-black hover:text-blue-500" size={36} />
      </div>
      <div className="absolute top-28 right-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaHeart
          onClick={() => handleSaveProduct(data.id)}
          className={`text-black hover:text-blue-500 ${savedProducts.includes(data.id) ? 'text-red-500' : ''}`}
          size={36}
        />
      </div>

      <div className="flex flex-col items-start mx-3 w-full gap-1 bg-white">
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={data.images?.[0]?.image || 'default-image-url'}
            alt={data.name || 'Product image'}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="font-bold">
            {truncateText(data.name)}
          </p>
        </div>
        <div>
          <p className="text-xl font-bold">In Stock</p>
        </div>
        <div>
          <Rating value={3.5} />
        </div>
        <div className="flex gap-6 items-center">
          <p className="font-bold">{FormatPrice(data.price)}</p>
          <div className='flex gap-0'>
            <SetQuantity
              cartCounter={true}
              cartProduct={data}
              handleQtyIncrease={() => handleCartQtyIncrease(data.id)}
              handleQtyDecrease={() => handleCartQtyDecrease(data.id)}
            />
          </div>
        </div>
        <div className="flex mx-auto justify-center items-center mt-4">
          <Button
            className="bg-white text-green-600 border border-black w-[200px] hover:bg-black"
            onClick={debouncedAddToCart}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
