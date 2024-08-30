import React from "react";
import { useCart } from "../../contexts/CartContext";
import CartProductItem from "./CartProductItem";
import CheckoutButton from "./CheckoutButton";

const CartSidebar: React.FC = () => {
    const { cartProducts, cartTotalAmount } = useCart();

    return (
        <div className="fixed top-0 left-0 h-full w-1/3 bg-white shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartProducts?.map(product => (
                <CartProductItem key={product.id} product={product} />
            ))}
            <div className="mt-4">
                <p className="text-lg font-semibold">Total: ${cartTotalAmount}</p>
                <CheckoutButton />
            </div>
        </div>
    );
};

export default CartSidebar;
