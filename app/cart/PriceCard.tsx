import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useCart } from "../hooks/useCart";
import { FormatPrice } from '../utils/formatPrice';

const PriceCard: React.FC = () => {
    const { cartTotalAmount } = useCart(); // Corrected name

    return (
        <div className="p-4 w-[525px] border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
            
            <div className="flex justify-between mb-2">
                <span>Price (1 Item)</span>
                <span>Rs. 500</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-500">Rs. 110</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Coupon for you</span>
                <span>Rs. 0.00</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-500">Rs. 60 Free</span>
            </div>
            
            <hr/>
            
            <div className="flex mt-4 mb-2 gap-4 mx-0"> 
                <Input type="email" placeholder="Enter promo code" />
                <Button variant="default">Apply</Button>     
            </div>

            <div className="flex justify-between mb-4">
                <span>Total Amount</span>
                <span>{FormatPrice(cartTotalAmount)}</span>
            </div>
            
            <div className="text-green-500 text-sm">
                You will save Rs. 110 on this order
            </div>
        </div>
    );
};

export default PriceCard;
