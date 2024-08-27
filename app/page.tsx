"use client";

import { CategoryCarousel } from "./component/CategoryCarousel";
import Container from "./component/Container";
import { HomeBanner } from "./component/HomeBanner";
import { AdvertiseBannner } from "../components/content/AdvertiseBannner";
import { Button } from "@/components/ui/button";
import { OfferCard } from "../components/content/OfferCard";
import { Service } from "../components/content/Service";
import { Store } from "../components/content/Store";
import { VendorCard } from "../components/content/vendorCard";
import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "./utils/token";
import ProductCarousel from "@/components/ProductCarousel";
import Slider from './../components/slider/slider';

const token = getCookie('token');
export const Home = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("token ", sessionStorage.getItem("token"))
        const response = await axios.get(`${apiUrl}auth/users/`, {

          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
          },
          withCredentials: true
        }).then(response=>{
          console.log(response.data);
        })  
      }catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [apiUrl]);
  
  // const productImages = [
  //   // Specify width and height
  //   { src: '/next.svg', alt: 'Product 2', width: 100, height: 100 }, // Specify width and height
  //   { src: '/user.png', alt: 'Product 3', width: 100, height: 100 }, // Specify width and height
  // ];s

  return (
    <div className="w-full">
      <div className="bg-green-500 w-full mt-5">
        <Container>
          {/* This is homepage Banner Component */}
    
          <HomeBanner />
          <Slider/>
          {/* <ProductCarousel images={productImages}/> */}
        </Container>
      </div>
      <div className="p-8">
        {/* This website Responsive container */}
        <Container>
          {/* Home page Category component */}
          <div>
            <CategoryCarousel />
          </div>
          {/* Vendor store component */}
          <div>
            <Store />
          </div>
          {/* Vendor offer card component */}
          <div>
            <OfferCard />
          </div>
          {/* This is the service page component display on homepage */}
          <div>
            <Service />
          </div>
          {/* Vendor card display on homepage after condition is applied */}
          <div>
            <VendorCard />
          </div>
        </Container>
      </div>
      {/* Advertise banner component on homepage */}
      <div>
        <AdvertiseBannner />
      </div>
      <Container>
        <div>
          <VendorCard />
        </div>
      </Container>
    </div>
  );
};

export default Home;
