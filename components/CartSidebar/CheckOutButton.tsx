import React from "react";

const CheckoutButton: React.FC = () => {
    const handleCheckout = () => {
        alert("Proceed to Checkout");
    };

    return (
        <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
        </button>
    );
};

export default CheckoutButton;
