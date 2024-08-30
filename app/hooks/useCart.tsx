// CartContext.tsx

import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { cartProductType } from "../product/[productid]/productDetails";
import { toast } from "react-hot-toast";
import { access } from "fs";

type CartContextType = {
    cartTotalQty: number;
    CartTotalAmount:number;
    cartProducts: cartProductType[] | null;
    handleAdProductToCart: (product: cartProductType) => void;
    handleRemoveProductFromCart: (productId: string) => void;
    handleCartQtyIncrease: (productId: string) => void;
    handleCartQtyDecrease: (productId: string) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propsName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<cartProductType[] | null>(null);

console.log('qty',cartTotalQty)
console.log('cartTotalAmount',cartTotalAmount)
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCartProducts(JSON.parse(cart));
        }
    }, []);
    // add make here to calculate total
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;
                        acc.total += itemTotal;
                        acc.qty += item.quantity;
                        return acc;
                    },
                    { total: 0, qty: 0 }
                );
                setCartTotalQty(qty);
                setCartTotalAmount(total);
                // Update total quantity state
                // If you need to store or use the total price, you can do so here
                // For example: setCartTotalPrice(total);
            }
        };
        getTotals();
    }, [cartProducts]);
    // finish here

    const handleAdProductToCart = useCallback((product: cartProductType) => {
        console.log('handleAdProductToCart called'); // Debugging line
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                const existingIndex = prev.findIndex((item) => item.id === product.id);
                if (existingIndex > -1) {
                    updatedCart = prev.map((item, index) =>
                        index === existingIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                    localStorage.setItem('cart', JSON.stringify(updatedCart));s
                    toast.success('Product quantity increased');
                    return updatedCart;
                } else {
                    updatedCart = [...prev, { ...product, quantity: 1 }];
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    toast.success('Product added to cart successfully');
                    return updatedCart;
                }
            } else {
                updatedCart = [{ ...product, quantity: 1 }];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                toast.success('Product added to cart successfully');
                return updatedCart;
            }
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((productId: string) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== productId);
            setCartProducts(filteredProducts);
            toast.success('Product removed from cart successfully');
            localStorage.setItem('cart', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((productId: string) => {
        let updatedCart;
        if (cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex((item) => item.id === productId);
            if (existingIndex > -1) {
                if (updatedCart[existingIndex].quantity === 99) {
                    return toast.error("Oops! Maximum quantity reached");
                }
                updatedCart[existingIndex].quantity += 1;
                setCartProducts(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((productId: string) => {
        let updatedCart;
        if (cartProducts) {
            updatedCart = [...cartProducts];
            const existingIndex = cartProducts.findIndex((item) => item.id === productId);
            if (existingIndex > -1) {
                if (updatedCart[existingIndex].quantity === 1) {
                    return toast.error("Quantity cannot be less than 1");
                }
                updatedCart[existingIndex].quantity -= 1;
                setCartProducts(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        }
    }, [cartProducts]);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAdProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
