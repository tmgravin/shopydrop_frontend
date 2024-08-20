"use client";

import { CategoryCarousel } from "./component/CategoryCarousel";
import Container from "./component/Container";
import { HomeBanner } from "./component/HomeBanner";
import { AdvertiseBannner } from "./component/content/AdvertiseBannner";
import { Button } from "@/components/ui/button";
import { OfferCard } from "./component/content/OfferCard";
import { Service } from "./component/content/Service";
import { Store } from "./component/content/Store";
import { VendorCard } from "./component/content/vendorCard";
import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "./utils/token";
const token = getCookie('token');

export const Home = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/auth/users/`, {
          headers: {
            "Authorization": `Bearer ` + sessionStorage.getItem("user"),
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="w-full">
      <div className="bg-green-500 w-full mt-5">
        <Container>
          {/* This is homepage Banner Component */}
          <HomeBanner />
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
