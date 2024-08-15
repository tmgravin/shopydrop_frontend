"use client";
import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { MdArrowBack } from "react-icons/md";
import Container from "../component/Container";
import CartClient from "./CartClient";
import PriceCard from "./PriceCard";

const Cart  = () => {
    const {cartProducts}=useCart();
    if(!cartProducts || cartProducts.length===0){
        return <div className="flex flex-col items-center">
            <div className="text-2xl">Cart is empty</div>
            <div>
                <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2">
                <MdArrowBack/>
                <span>Start Shopping</span>
                </Link>
            </div>   
            </div>      
    }
    return (
        <div className="pt-8">
            <Container>
                <div className="mx-auto gap-8 p-4 flex flex-col md:flex-row"> 
                <CartClient />
             <PriceCard/>
             </div>
            </Container>
        </div>
      );
}
 
export default Cart ;