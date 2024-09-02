import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useCart } from "../hooks/useCart";
import { FormatPrice } from '../utils/formatPrice';

const PriceCard: React.FC = () => {
    const { cartTotalAmount } = useCart();

    return (
        <div className="p-4 sm:p-6 w-full max-w-md border border-gray-200 rounded-lg shadow-lg bg-white mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Price Details</h2>
            
            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Price (1 Item)</span>
                    <span>Rs. 500</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Discount</span>
                    <span className="text-green-600">Rs. 110</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Coupon for you</span>
                    <span>Rs. 0.00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">Rs. 60 Free</span>
                </div>
            </div>
            
            <hr className="mb-6"/>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"> 
                <Input 
                    type="text" 
                    placeholder="Enter promo code" 
                    className="w-full sm:flex-1" 
                />
                <Button variant="default" className="w-full sm:w-auto">
                    Apply
                </Button>     
            </div>

            <div className="flex justify-between text-base sm:text-lg font-medium text-gray-800 mb-4">
                <span>Total Amount</span>
                <span>{FormatPrice(cartTotalAmount)}</span>
            </div>
            
            <div className="text-green-600 text-sm sm:text-base">
                You will save Rs. 110 on this order
            </div>
        </div>
    );
};

export default PriceCard;
