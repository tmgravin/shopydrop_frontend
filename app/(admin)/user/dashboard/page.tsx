import { Card } from "@/components/ui/card";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { PiWarningOctagon } from "react-icons/pi";
import { TiDocumentDelete } from "react-icons/ti";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const tableData = [
  {
    id: "#0001",
    img: "/user.png",
    name: "Riya Neupane",
    order: 300,
    amount: 10000,
  },
  {
    id: "#0002",
    img: "/user.png",
    name: "Riya Neupane",
    order: 300,
    amount: 10000,
  },
  {
    id: "#0003",
    img: "/user.png",
    name: "Riya Neupane",
    order: 300,
    amount: 10000,
  },
  {
    id: "#0004",
    img: "/user.png",
    name: "Riya Neupane",
    order: 300,
    amount: 10000,
  },
];

interface CardComponentProp {
  data: string;
  name: string;
  percent: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const iconMapping: { [key: string]: JSX.Element } = {
  LuUsers: <LuUsers className="text-2xl" />,
  FiUser: <FiUser className="text-2xl" />,
  PiWarningOctagon: <PiWarningOctagon className="text-2xl" />,
  TiDocumentDelete: <TiDocumentDelete className="text-2xl" />,
};

const CardComponent: React.FC<CardComponentProp> = ({
  data,
  name,
  percent,
  icon,
  iconBg,
  iconColor,
}) => {
  const isPositive = percent > 0;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-bold">{data}</div>
        <div
          className="rounded-md p-1"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {iconMapping[icon]}
        </div>
      </div>
      <div className="text-[#656464]">{name}</div>
      <div
        className={cn("px-2 py-1 rounded-md w-fit mt-3", {
          "text-[#568D5C] bg-[#568D5C4D]": isPositive,
          "text-[#E64646] bg-[#E646464D]": !isPositive,
        })}
      >
        {isPositive ? "+" : ""}
        {percent}%
      </div>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  let earning = 500000;
  let invested = 200000;

  return (
    <div className="min-h-screen h-full adminUserBg">
      <div className="mx-auto px-2.5 md:px-20 w-full">
        <div className="flex flex-col gap-14 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <CardComponent
              data="10,000"
              name="Total Users"
              percent={5.9}
              icon="LuUsers"
              iconBg="#568D5C4D"
              iconColor="#568D5C"
            />
            <CardComponent
              data="6,000"
              name="Total Vendors"
              percent={-5.9}
              icon="FiUser"
              iconBg="#E646464D"
              iconColor="#D60404"
            />
            <CardComponent
              data="Rs 5,00,000"
              name="Total Earnings"
              percent={5.9}
              icon="PiWarningOctagon"
              iconBg="#E646464D"
              iconColor="#D60404"
            />
            <CardComponent
              data="25,000"
              name="Total Orders"
              percent={5.9}
              icon="TiDocumentDelete"
              iconBg="#7707894D"
              iconColor="#770789"
            />
          </div>
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-5 ">
                  <h1 className="text-lg font-medium">Revenue Report</h1>
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        {/* Square */}
                        <div className="size-4 bg-[#9747FF] rounded-sm"></div>
                        Earnings
                      </div>
                      <p className="font-medium">Rs {earning}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        {/* Square */}
                        <div className="size-4 bg-[#35ED07] rounded-sm"></div>
                        Earnings
                      </div>
                      <p className="font-medium">Rs {invested}</p>
                    </div>
                  </div>
                </div>
                {/* Select Dropdown */}
                <Select>
                  <SelectTrigger className=" w-40">
                    <SelectValue placeholder="Select Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time</SelectLabel>
                      <SelectItem value="1 month">1 Month</SelectItem>
                      <SelectItem value="6 months">6 Months</SelectItem>
                      <SelectItem value="1 year">1 Year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full h-64 rounded-xl bg-gray-600"></div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-5 ">
            <Card>
              <div className="flex flex-col gap-3 ">
                <h1 className="font-medium">Vendor Sale</h1>
                <div className="h-40 w-full rounded-lg bg-gray-400"></div>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-3">
                <h1 className="font-medium">Reward Point</h1>
                <div className="h-40 w-full rounded-lg bg-gray-400"></div>
              </div>
            </Card>
          </div>
          <Card>
            <div className="flex justify-between pb-3">
              <h1 className="text-lg font-medium">Popular Client</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <SlOptionsVertical className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>CLIENT NAME</TableHead>
                  <TableHead>ORDER</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Image
                          src={`${data.img}`}
                          alt={data.name}
                          height={50}
                          width={50}
                          className="rounded-full"
                        />
                        {data.name}
                      </div>
                    </TableCell>
                    <TableCell>{data.order}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button>
                              <SlOptions className="size-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
