import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdArrowForwardIos } from "react-icons/md";
import { Card } from "@/components/ui/card";

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
  {
    title: "Only This Weeks",
    subtitle: "Provide you experienced quality products",
    description: "Feed your family the best",
    buttonText: "Shop Now",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "offer product",
  },
  {
    title: "Only This Weeks",
    subtitle: "Provide you experienced quality products",
    description: "Feed your family the best",
    buttonText: "Shop Now",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "offer product",
  },
  {
    title: "Only This Weeks",
    subtitle: "Provide you experienced quality products",
    description: "Feed your family the best",
    buttonText: "Shop Now",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s",
    altText: "offer product",
  },
];

export function OfferCard({ className, ...props }: { className?: string }) {
  return (
    <div className="flex gap-2 mb-20">
      {offerCardData.map((offer, index) => (
        <Card
          key={index}
          className={cn("w-[359px] h-[348px] mt-6", className)}
          {...props}
        >
          <div className="ml-4 space-y-2">
            <p className="text-xl text-green-400 mt-6">{offer.title}</p>
            <h1 className="text-2xl font-bold">{offer.subtitle}</h1>
            <p>{offer.description}</p>
            <Button className="flex gap-2 w-[114px] h-[34px] bg-green-400">
              {offer.buttonText} <MdArrowForwardIos size={16} />
            </Button>
          </div>
          <div>
            <img
              className="overflow-hidden h-28 w-full object-cover mt-9"
              src={offer.imageUrl}
              alt={offer.altText}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
