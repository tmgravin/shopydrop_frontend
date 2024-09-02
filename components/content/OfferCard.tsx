import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdArrowForwardIos } from "react-icons/md";
import { Card } from "@/components/ui/card";
import Image from "next/image";

// Static data
const offerCardData = [
  {
    title: "Only This Weeks",
    subtitle: "Provide you experienced quality products",
    description: "Feed your family the best",
    buttonText: "Shop Now",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "offer product",
  },
  // Repeat the objects as needed
];

export function OfferCard({ className, ...props }: { className?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 mb-12">
      {offerCardData.map((offer, index) => (
        <Card
          key={index}
          className={cn("w-full md:w-[48%] lg:w-[23%] h-auto p-4", className)}
          {...props}
        >
          <div className="space-y-1">
            <p className="text-lg md:text-xl text-green-400">{offer.title}</p>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              {offer.subtitle}
            </h1>
            <p className="text-sm md:text-base">{offer.description}</p>
            <Button className="flex items-center gap-2 w-full md:w-auto bg-green-400">
              {offer.buttonText} <MdArrowForwardIos size={16} />
            </Button>
          </div>
          <div className="mt-2">
            <Image
              className="w-full h-24 md:h-28 lg:h-16 object-cover rounded"
              width={80}
              height={30}
              src={offer.imageUrl}
              alt={offer.altText}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
