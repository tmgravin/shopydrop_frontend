"use client"

import { FC } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


interface ProductCarouselProps {
  images: { src: string; alt: string;  width: number; height: number }[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ images }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="w-full h-auto"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="object-cover w-36 h-36"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
