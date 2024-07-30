import { CategoryCarousel } from "./component/CategoryCarousel";
import Container from "./component/Container";
import { HomeBanner } from "./component/HomeBanner";
import { AdvertiseBannner } from "./component/content/AdvertiseBannner";
import { OfferCard } from "./component/content/OfferCard";
import { Service } from "./component/content/Service";
import { Store } from "./component/content/Store";
import { VendorCard } from "./component/content/vendorCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { NextPage } from "next";

export const Home: NextPage = () => {
  return (
    <div className="w-full">
      <div className="bg-green-500 w-full mt-5">
        <Container>
          {/*This is homepage Banner Component  */}
          <HomeBanner />
        </Container>
      </div>
      <div className="p-8">
        {/* This website Responsive container  */}
        <Container>
          {/* Home page Category component */}
          <div>
            <CategoryCarousel />
          </div>
          {/* vendor store component   */}
          <div>
            <Store />
          </div>
          {/* VVendor offer card component */}
          <div>
            <OfferCard />
          </div>
          {/* this is the website service page component display is homepage */}
          <div>
            <Service />
          </div>
          {/* Vendor card dispay is homepage after condition apply */}
          <div>
            <VendorCard />
          </div>
        </Container>
      </div>
      {/* Advertise bannner component in homepage */}
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
