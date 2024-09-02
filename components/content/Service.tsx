import React from "react";
import { RiEBike2Line } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { TbDeviceMobileSearch } from "react-icons/tb";

export const Service = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="mt-1">
          <RiEBike2Line size={28} />
        </div>
        <div>
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Fast Delivery</h1>
          <p className="text-sm md:text-base lg:text-lg">Lorem ipsum, dolor sit amet consectetur.</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        <div className="mt-1">
          <FaHandshakeSimple size={28} />
        </div>
        <div>
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">100% Satisfaction Guarantee</h1>
          <p className="text-sm md:text-base lg:text-lg">Lorem ipsum, dolor sit amet consectetur.</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        <div className="mt-1">
          <TbDeviceMobileSearch size={28} />
        </div>
        <div>
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Top-Notch Support</h1>
          <p className="text-sm md:text-base lg:text-lg">Lorem ipsum, dolor sit amet consectetur.</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        <div className="mt-1">
          <MdOutlinePayment size={28} />
        </div>
        <div>
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Secure Payment</h1>
          <p className="text-sm md:text-base lg:text-lg">Lorem ipsum, dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};
