"use client"
import Cart from './../../cart/page';
interface SetQtyProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}
const SetQuantity:React.FC<SetQtyProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {

    return ( 
        <div className='flex  items-center'>
            {cartCounter? null : <div className='font-semibold'> Quantity:</div> }
            <div className='flex items-center text-base'>
            <button className='w-8 border border-black' onClick={handleQtyDecrease}>-</button>
            <div className='w-8 border border-black items-center text-center'>{cartProduct.quantity}</ div>
            <button className='w-8 border border-black' onClick={handleQtyIncrease}>+</button>
            </div> 
            </div> 
     );
}
 
export default SetQuantity;