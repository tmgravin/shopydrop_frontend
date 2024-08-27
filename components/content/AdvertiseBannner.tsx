import React from "react";
import Image from "next/image";

export const AdvertiseBannner = () => {
  return (
    <div className="relative w-full h-36 md:h-48 lg:h-60">
      <Image
        className="object-cover w-full h-full"
        src="https://static.vecteezy.com/system/resources/previews/005/237/773/non_2x/bicycle-delivery-and-delivery-service-concept-delivery-man-riding-a-bicycle-with-a-delivery-bag-illustration-vector.jpg"
        alt="advertisement banner"
        fill
      />
    </div>
  );
};
