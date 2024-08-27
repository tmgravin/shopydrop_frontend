import React from "react";
import { RiEBike2Line } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { TbDeviceMobileSearch } from "react-icons/tb";

export const Service = () => {
  return (
    <div className="w-full gap-4 flex mt-6">
      <div className="flex w-full  justify-start gap-3">
        <div className="justify-start  items-center mt-1">
          <RiEBike2Line size={28} />
        </div>
        <div className="items-start justify-start text-star">
          <h1 className="font-bold text-2xl">Fast Delivery</h1>
          <p> Lorem ipsum, dolor sit amet consectetur.</p>
          <div></div>
        </div>
      </div>
      <div className="flex w-full  justify-start gap-3">
        <div className="justify-start  items-center mt-1">
          <FaHandshakeSimple size={28} />
        </div>
        <div className="items-start justify-start text-star">
          <h1 className="font-bold text-2xl">100% Satisfaction Guarantee</h1>
          <p> Lorem ipsum, dolor sit amet consectetur.</p>
          <div></div>
        </div>
      </div>
      <div className="flex w-full justify-start gap-3">
        <div className="justify-start  items-center mt-1">
          <TbDeviceMobileSearch size={28} />
        </div>
        <div className="items-start justify-start text-star">
          <h1 className="font-bold text-2xl">Top-Notch Support </h1>
          <p> Lorem ipsum, dolor sit amet consectetur.</p>
          <div></div>
        </div>
      </div>
      <div className="flex w-full  justify-start gap-3">
        <div className="justify-start  items-center mt-1">
          <MdOutlinePayment size={28} />
        </div>
        <div className="items-start justify-start text-star">
          <h1 className="font-bold text-2xl">Secure Payment</h1>
          <p> Lorem ipsum, dolor sit amet consectetur.</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};
