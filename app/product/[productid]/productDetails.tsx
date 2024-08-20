"use client";
import React, { useCallback, useEffect } from "react";
import { Rating } from '@mui/material';
import { FormatPrice } from "@/app/utils/formatPrice";
import SetQuantity from "./setQuantity";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { useCart } from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import Cart from './../../cart/page';
import { product } from './../../utils/product';
import Link from "next/link";
interface ProductDetailsProps {
  product: any;
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
}

export type cartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImg;
  quantity: number;
  price: number;
}

export type SelectedImg = {
  color: string;
  colorCode: string;
  image: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const {handleAdProductToCart, cartProducts  }=useCart();
  const [isProductInCart, setIsProductInCart] = React.useState(false);
  const [cartProduct, setCartProduct] = React.useState<cartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price
  });
  const router=useRouter();

  console.log(cartProducts); 
  useEffect(()=>{
    setIsProductInCart(false)
    if(cartProducts){
      const existingIndex=cartProducts.findIndex((item)=>item.id===cartProduct.id);
      if(existingIndex!==-1){
        setIsProductInCart(true)
      }
    }
  },[cartProducts])

  const productRating = product.reviews.reduce((acc: number, item: any) =>
    item.rating + acc, 0) / product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImg) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: value
    }));
  }, []);

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1
    }));
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity > 0 ? prev.quantity - 1 : 0 
    }));
  }, [cartProduct]);

  return (
    <div className="grid space-between gap-8 grid-cols-1 md:grid-cols-2 mt-12 mb-10">
      <div className="mt-10"> 
        {product.images && product.images.length > 0 && (
          <img src={cartProduct.selectedImg.image} alt={product.name} className="w-auto h-72 mx-[30%]" />
        )}
        <div className="flex gap-2 mt-4">
          {product.images.map((img:any, index:any) => (
            <img
              key={index}
              src={img.image}
              alt={product.name}
              className="w-28 h-28 cursor-pointer"
              onClick={() => handleColorSelect(img)}
            />
          ))}
        </div>
        </div>
      <div className="flex flex-col gap-1">
        <div>
          <p className="font-bold text-xl text-green-500">{FormatPrice(product.price)}</p>
        </div> 
        <div className="text-2xl font-bold">{product.name}</div>
        <div className={product.inStock ? 'text-green-500' : 'text-red-500'}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <div className="text-justify">{product.description}</div>
        <div className="flex flex-col gap-1">
          <Horizontal />
          <div  className="flex gap-6"> 
            <SetQuantity 
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
            cartCounter={true}
            />
            <Button variant="outline" onClick={() => handleAdProductToCart(cartProduct)}>
              {isProductInCart ? <Link href="/cart">view cart</Link> : "add to cart"}



            </Button>
            <p className="flex gap-2 items-center justify-center"> <CiHeart size={20} /> Add to wishlist</p> 
            </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;