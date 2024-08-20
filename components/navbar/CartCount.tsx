"use client"

import { useCart } from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
    const { cartTotalQty } = useCart();
    const router = useRouter();

    return (
        <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <div className="text-xl flex">
            <CiShoppingCart size={42} />
            </div>
            <span className="absolute top-[-3px]  w-4 h-6 rounded flex  items-center ml-7 justify-center text-xl text-black">
                {cartTotalQty}
            </span>
        </div>
    );
}

export default CartCount;
