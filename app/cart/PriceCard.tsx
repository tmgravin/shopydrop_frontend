import { Button } from '@/components/ui/button';
import { products } from '../utils/products';
import { Input } from "@/components/ui/input"
interface product {
  product_id: number;
  name: string;
  qty: number;
  price: number;
  discounted_price?: number; // Assuming this can be optional
}
const PriceCard: React.FC = ({}) => {

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
            <div className="flex mt-4 mb-2  gap-4 mx-0"> 
            <Input type="email" placeholder="enter promo code" />
            <Button variant="default">Apply</Button>     
            </div>

            <div className="flex  justify-between mb-4">
                <span>Total Amount</span>
                <span>Rs. 390</span>
            </div>
            <div className="text-green-500 text-sm">You will save Rs. 110 on this order</div>
        </div>
  );
};

export default PriceCard;
