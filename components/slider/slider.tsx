import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Array of image URLs from merokirana.com
const images = [
  'https://www.merokirana.com/archive/KiranaOffer/883d4540360d4e2ba66c6df27fe99f66.jpg',
  'https://www.merokirana.com/archive/KiranaCollection/afdfb755f4564b57aab237b83aa09e84.jpg',
  'https://www.merokirana.com/archive/KiranaCollection/f76fd9fbf409407ba8319a892a351d23.jpg',
  'https://www.merokirana.com/archive/KiranaCollection/703756a7a7cd436a9e8fe3a31b3bc4d9.jpg',
  // Add more images as needed
];

const Slider: React.FC = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000, // Time in milliseconds between slide transitions
        disableOnInteraction: false, // Keep autoplay running after user interactions
      }}
      breakpoints={{
        1200: {
          slidesPerView: 1, // 1 slide per view on small screens
        },
        768: {
          slidesPerView: 2, // 2 slides per view on medium screens
        },
        1024: {
          slidesPerView: 3, // 3 slides per view on large screens
        },
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="w-full h-auto"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
