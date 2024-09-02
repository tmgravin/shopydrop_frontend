// "use client";
// import Link from "next/link";
// import { useCart } from "../hooks/useCart";
// import { MdArrowBack } from "react-icons/md";
// import SetQuantity from "../product/[productid]/setQuantity";
// import Image from "next/image";
// import { cartProductType } from "../product/[productid]/productDetails";
// import { useRouter } from "next/navigation";

// const CartClient = () => {
//     const { cartProducts, handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();
//     const router = useRouter();

//     return (
//         <div className="p-4 sm:p-6 border w-full max-w-3xl h-auto border-gray-200 rounded-lg shadow-lg bg-white mx-auto">
//             <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Your Shopping Bag</h1>
//                 <Link href="/" className="text-green-600 hover:underline flex items-center text-sm sm:text-base">
//                     <MdArrowBack className="mr-1" />
//                     Continue Shopping
//                 </Link>
//             </div>
//             <hr className="mb-6" />

//             <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
//                 You have {cartProducts ? cartProducts.length : 0} items in your bag
//             </h2>

//             {cartProducts && cartProducts.length > 0 ? (
//                 <div className="space-y-4 sm:space-y-6">
//                     {cartProducts.map((item: cartProductType, index: number) => (
//                         <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
//                             <Image
//                                 width={64}
//                                 height={64}
//                                 src={item.selectedImg.image}
//                                 alt={item.name}
//                                 className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mb-4 sm:mb-0"
//                             />
//                             <div className="flex-1 text-center sm:text-left">
//                                 <h3 className="text-base sm:text-lg font-medium text-gray-800">{item.name}</h3>
//                                 <p className="text-sm text-green-600 mt-1">
//                                     Rs. 300/kg <span className="line-through text-gray-500">Rs. {item.price}</span>
//                                 </p>
//                                 <div className="flex items-center justify-between mt-4">
//                                     <SetQuantity 
//                                         cartCounter={true}
//                                         cartProduct={item}
//                                         handleQtyIncrease={() => handleCartQtyIncrease(item.id)}
//                                         handleQtyDecrease={() => handleCartQtyDecrease(item.id)}
//                                     />
//                                     <button 
//                                         onClick={() => handleRemoveProductFromCart(item.id)} 
//                                         className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 sm:mt-0">
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500 mt-8">Your cart is empty. Start adding items to your cart!</p>
//             )}

//             {cartProducts && cartProducts.length > 0 && (
//                 <button 
//                     onClick={() => router.push('/checkout')} 
//                     className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors">
//                     Proceed to Checkout
//                 </button>
//             )}
//         </div>
//     );
// };

// export default CartClient;

"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import SetQuantity from "../product/[productid]/setQuantity";
import Image from "next/image";
import { cartProductType } from "../product/[productid]/productDetails";
import { useRouter } from "next/navigation";

const CartClient = () => {
    // Destructure necessary methods and cart products from the custom hook
    const { cartProducts, handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();
    const router = useRouter();

    return (
        <div className="p-4 sm:p-6 border w-full max-w-3xl h-auto border-gray-200 rounded-lg shadow-lg bg-white mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Your Shopping Bag</h1>
                <Link href="/" className="text-green-600 hover:underline flex items-center text-sm sm:text-base">
                    <MdArrowBack className="mr-1" />
                    Continue Shopping
                </Link>
            </div>
            <hr className="mb-6" />

            {/* Cart Item Count */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
                You have {cartProducts ? cartProducts.length : 0} items in your bag
            </h2>

            {/* Cart Items List */}
            {cartProducts && cartProducts.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                    {cartProducts.map((item: cartProductType, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                            <Image
                                width={64}
                                height={64}
                                src={item.selectedImg.image}
                                alt={item.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mb-4 sm:mb-0"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-base sm:text-lg font-medium text-gray-800">{item.name}</h3>
                                <p className="text-sm text-green-600 mt-1">
                                    Rs. 300/kg <span className="line-through text-gray-500">Rs. {item.price}</span>
                                </p>
                                <div className="flex items-center justify-between mt-4">
                                    <SetQuantity 
                                        cartCounter={true}
                                        cartProduct={item}
                                        handleQtyIncrease={() => handleCartQtyIncrease(item.id)}
                                        handleQtyDecrease={() => handleCartQtyDecrease(item.id)}
                                    />
                                    <button 
                                        onClick={() => handleRemoveProductFromCart(item.id)} 
                                        className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 sm:mt-0">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-8">Your cart is empty. Start adding items to your cart!</p>
            )}

            {/* Checkout Button */}
            {cartProducts && cartProducts.length > 0 && (
                <button 
                    onClick={() => router.push('/checkout')} 
                    className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors">
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
};

export default CartClient;

