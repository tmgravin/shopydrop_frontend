import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdArrowForwardIos } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function OfferCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[359px] h-[348px] mt-6", className)} {...props}>
      <div className=" ml-4 space-y-2">
        <p className="text-xl text-green-400  mt-6"> Only This Weeks</p>
        <h1 className="text-2xl font-bold">
          Provide you experienced quality products
        </h1>

        <p className=""> feed your family the best</p>

        <Button className="flex gap-2 w-[114px]  h-[34px] bg-green-400">
          Shop Now <MdArrowForwardIos size={16} />
        </Button>
      </div>

      <div>
        <img
          className="overflow-hidden h-28 w-full object-cover mt-9"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TI926enuNB0GeZ4h_zUu3lFVwGgwiFRqfg&s"
          alt="offer product"
        />
      </div>
    </Card>
  );
}
