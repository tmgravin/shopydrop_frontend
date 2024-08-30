// import * as React from "react";
// import { useEffect, useRef } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Image from "next/image";

// import { TiArrowSortedDown } from "react-icons/ti";
// import apiutils from "@/app/utils/apiutils";


// const getRandomImage = () => {
//   apiutils.get("/api/lookup/category/category")
//   .then((response) =>
//   {
//     response.data
//     console.log("data",response)
    
//   })
//   // Placeholder image service URL (for demo purposes)
//   return `https://via.placeholder.com/600x400.png?text=Product${Math.floor(
//     Math.random() * 100
//   )}`;
// };

// export function CategoryCarousel() {
//   const carouselRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
    
//     const interval = setInterval(() => {
//       if (carouselRef.current) {
//         const carousel = carouselRef.current as unknown as { next: () => void };
//         carousel.next();
//       }
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, []);

//   return (
//     <Carousel ref={carouselRef} className="w-full shadow-none gap-0">
//       <CarouselContent className="w-full flex gap-2">
//         {Array.from({ length: 20 }).map((_, index) => (
//           <CarouselItem
//             key={index}
//             className="flex-none p-1 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
//           >
//             <Card className="bg-transparent border-none shadow-none">
//               <CardContent className="flex aspect-square items-center justify-center p-0 shadow-none">
//                 <Image
//                   src={getRandomImage()}
//                   width={80}
//                   height={80}
//                   alt={`Product ${index + 1}`}
//                   className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full"
//                 />
//               </CardContent>
//               <div className="flex items-center text-center justify-between mt-1">
//                 <p className="text-center text-xs sm:text-sm mx-auto">
//                   Category Name
//                 </p>
//                 <TiArrowSortedDown size={14} />
//               </div>
//             </Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { TiArrowSortedDown } from "react-icons/ti";
import axios from "axios";// import baseURL from "@app/utils/apiutils";

const baseURL =process.env.NEXT_PUBLIC_BASE_URL

export function CategoryCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<any[]>([]); // State to hold category data

  useEffect(() => {
    // Fetch categories from the API
    axios.get(`${baseURL}/api/lookup/category/category`)
      .then((response) => {
        console.log("Fetched categories:", response.data); // Log the fetched data
        setCategories(response.data); // Set the fetched categories to state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error); // Handle any errors
      });

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const carousel = carouselRef.current as unknown as { next: () => void };
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Placeholder image service URL (for demo purposes)
  const getRandomImage = (index: number) => {
    return `https://via.placeholder.com/600x400.png?text=Product${index}`;
  };

  return (
    <Carousel ref={carouselRef} className="w-full shadow-none gap-0">
      <CarouselContent className="w-full flex gap-2">
        {categories.map((category, index) => (
          <CarouselItem
            key={index}
            className="flex-none p-1 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
          >
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="flex  text-black aspect-square items-center justify-center p-0 shadow-none">
                <Image
                  src=""
                  width={80}
                  height={80}
                  alt={`Category ${category.categoryName}`}
                  className="h-12  w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full"
                />
              </CardContent>
              <div className="flex items-center text-center justify-between mt-1">
                <p className="text-center text-xs sm:text-sm mx-auto">
                  {category.categoryName} {/* Display the category name */}
                </p>
                <TiArrowSortedDown size={14} />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
