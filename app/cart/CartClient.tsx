"use client";
import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import SetQuantity from "../product/[productid]/setQuantity";
import Image from "next/image";
import { cartProductType } from "../product/[productid]/productDetails";
import { useRouter } from "next/navigation";
const CartClient = () => {
    const { cartProducts, handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="p-4 border w-[798px] h-auto border-gray-300 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold">Continue Shopping</h1>
            <hr />

            <h2 className="text-lg font-semibold mb-4">Your bag ({cartProducts ? cartProducts.length : 0})</h2>
            <div className="mb-4">
                {cartProducts && cartProducts.map((item: cartProductType, index: number) => (
                    <div key={index} className="flex items-center mb-4">
                        <Image
                        width={10}
                        height={100} src={item.selectedImg.image} alt={item.name} className="w-16 h-16" />
                        <div className="flex-1 ml-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-green-500">
                                Rs. 300/kg <span className="line-through text-gray-500">Rs.{item.price}</span>
                            </p>
                            <div className="flex items-center mt-2">
                                <SetQuantity 
                                    cartCounter={true}
                                    cartProduct={item}
                                    handleQtyIncrease={() => handleCartQtyIncrease(item.id)}
                                    handleQtyDecrease={() => handleCartQtyDecrease(item.id)}
                                />
                                <button 
                                    onClick={() => handleRemoveProductFromCart(item.id)} 
                                    className="ml-4 text-red-500">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button  onClick={() => router.push('/checkout')} className="w-full bg-green-500 text-white py-2 rounded ">Checkout</button>
        </div>
    );
}

export default CartClient;
