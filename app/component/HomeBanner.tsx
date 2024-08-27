import React from "react";

export const HomeBanner = () => {
  return (
    <div className="w-full">
      <div className="relative min-h-[225px] w-full text-black">
        <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4 items-center text-center lg:text-left">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white mb-2">
              We Bring the store <br /> to your door
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labo magna aliqua.
            </p>
            <button className="w-[116px] h-[30px] md:w-[120px] md:h-[36px] lg:w-[140px] lg:h-[40px] bg-green-950 rounded-sm text-white">
              Shop Now
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <p className="">Design Image will Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
