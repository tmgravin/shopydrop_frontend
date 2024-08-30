import React from "react";
import { cartProductType } from "../../utils/types";
import { useCart } from "../../contexts/CartContext";

type CartProductItemProps = {
    product: cartProductType;
};

const CartProductItem: React.FC<CartProductItemProps> = ({ product }) => {
    const { handleCartQtyIncrease, handleCartQtyDecrease, handleRemoveProductFromCart } = useCart();

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <div className="flex items-center">
                    <button onClick={() => handleCartQtyDecrease(product.id)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button onClick={() => handleCartQtyIncrease(product.id)}>+</button>
                </div>
            </div>
            <button onClick={() => handleRemoveProductFromCart(product.id)}>Remove</button>
        </div>
    );
};

export default CartProductItem;
