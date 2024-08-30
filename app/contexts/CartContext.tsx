import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { cartProductType } from "../utils/types";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: cartProductType[] | null;
    handleAddProductToCart: (product: cartProductType) => void;
    handleRemoveProductFromCart: (productId: string) => void;
    handleCartQtyIncrease: (productId: string) => void;
    handleCartQtyDecrease: (productId: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<cartProductType[] | null>(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCartProducts(JSON.parse(storedCart));
    }, []);

    useEffect(() => {
        if (cartProducts) {
            const { total, qty } = cartProducts.reduce(
                (acc, item) => {
                    acc.total += item.price * item.quantity;
                    acc.qty += item.quantity;
                    return acc;
                },
                { total: 0, qty: 0 }
            );
            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }
    }, [cartProducts]);

    const handleAddProductToCart = useCallback((product: cartProductType) => {
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
                } else {
                    updatedCart = [...prev, { ...product, quantity: 1 }];
                }
            } else {
                updatedCart = [{ ...product, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Product added to cart');
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((productId: string) => {
        setCartProducts((prev) => {
            const updatedCart = prev?.filter(item => item.id !== productId) || null;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Product removed from cart');
            return updatedCart;
        });
    }, []);

    const handleCartQtyIncrease = useCallback((productId: string) => {
        setCartProducts((prev) => {
            const updatedCart = prev?.map(item => 
                item.id === productId && item.quantity < 99
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ) || null;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleCartQtyDecrease = useCallback((productId: string) => {
        setCartProducts((prev) => {
            const updatedCart = prev?.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ) || null;
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartTotalQty,
                cartTotalAmount,
                cartProducts,
                handleAddProductToCart,
                handleRemoveProductFromCart,
                handleCartQtyIncrease,
                handleCartQtyDecrease
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartContextProvider");
    return context;
};
