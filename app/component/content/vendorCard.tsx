"use client";

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



type CardProps = React.ComponentProps<typeof Card>;

export function VendorCard({ className, ...props }: CardProps) {
  return (
    <div>
      {/* <h1 className="text-2xl font-bold items-center text-center justify-center mt-4">
        {" "}
        Choose Your Shop Near Annamnagar
      </h1> */}
      <Card
        className={cn("relative w-[331px] h-[183.8px] mt-5", className)}
        {...props}
      >
        <div className="bg-green-600 rounded-full w-12 h-12 ml-2 mt-2">
          <img
            className="object-cover rounded-full h-12 w-12 left-0 items-start text-start"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s"
            alt="vendor Store Name"
          />
        </div>
        <div className="flex justify-between">
          <div className="mx-2 space-y-1s">
            <h1 className="font-bold">Kirana Pasal</h1>
            <p>Alcohol Groceries</p>
            <Button className="bg-green-600 w-[144px] h-[34pxs]">
              Shop Now
            </Button>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-0 w-[141px] h-[138.8px] object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s"
          alt="Pasal image"
        />
      </Card>
    </div>
  );
}
