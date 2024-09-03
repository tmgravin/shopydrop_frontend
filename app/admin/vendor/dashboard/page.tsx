"use client";
import { Card } from "@/components/ui/card";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { PiWarningOctagon } from "react-icons/pi";
import { TiDocumentDelete } from "react-icons/ti";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { addDays, format, subDays } from "date-fns";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarIcon, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine, RiProgress2Fill } from "react-icons/ri";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";

interface CardComponentProp {
  title: string;
  amount: string;
}

const CardComponent: React.FC<CardComponentProp> = ({ title, amount }) => {
  return (
    <Card className="p-4 h-40">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col gap-5 justify-between items-center w-full">
          <div className="flex justify-between w-full">
            <h1 className=" text-base sm:text-lg font-semibold">{title}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SlOptionsVertical className="size-5" />
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
          <h1 className="text-xl sm:text-2xl">{amount}</h1>
        </div>
      </div>
    </Card>
  );
};

const activeStatus = [
  {
    page: "/products/juice",
    users: 13,
  },
  {
    page: "/categories/juice",
    users: 11,
  },
  {
    page: "/categories/wine",
    users: 10,
  },
  {
    page: "/account/orders",
    users: 4,
  },
  {
    page: "/cart",
    users: 5,
  },
  {
    page: "/checkout",
    users: 5,
  },
];

const recentOrders = [
  {
    id: 1,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Completed",
    total: "10000",
  },
  {
    id: 2,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Pending",
    total: "10000",
  },
  {
    id: 3,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Completed",
    total: "10000",
  },
  {
    id: 4,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Cancelled",
    total: "10000",
  },
  {
    id: 5,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Completed",
    total: "10000",
  },
  {
    id: 6,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Completed",
    total: "10000",
  },
  {
    id: 7,
    customer: "Riya Neupane",
    product: "Apple",
    photo: "/apple.jpg",
    date: "1/1/2024",
    status: "Completed",
    total: "10000",
  },
];

const VendorDashboard: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  let earning = 500000;
  let invested = 200000;
  const [date, setDate] = useState<Date | undefined>(new Date());
  let activeUsers = 150;

  const classLink = (status: string) =>
    status === "Completed"
      ? "bg-primary rounded-2xl"
      : status === "Pending"
      ? "bg-yellow-600 rounded-2xl"
      : "bg-red-700 rounded-2xl";

  return (
    <div className="min-h-screen h-full ">
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""} `}>
        <div className="flex flex-col gap-14 py-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-10">
            <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
            <div className="">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "sm:w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                      setDate(subDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Yesterday</SelectItem>
                      <SelectItem value="3">3 days Ago</SelectItem>
                      <SelectItem value="7">Last week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div
            className={`grid grid-cols-1   gap-6 ${
              isSidebarOpen
                ? "lg:grid-cols-2 xl:grid-cols-3 "
                : "lg:grid-cols-3 md:grid-cols-2"
            }`}
          >
            <CardComponent title="Total Users" amount="5000" />
            <CardComponent title="Total Vendors" amount="Rs 500,000" />
            <CardComponent title="Total Earnings" amount="200" />
          </div>
          <div className={`grid  grid-cols-3 gap-6`}>
            <Card
              className={`${
                isSidebarOpen
                  ? " col-span-3 xl:col-span-1"
                  : "col-span-3 lg:col-span-1  "
              }`}
            >
              <div className="flex flex-col w-full items-center justify-center gap-5">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-sm sm:text-base font-medium">
                    Active Users
                  </h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <SlOptionsVertical className="size-5" />
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
                <div
                  className=" w-full h-40 text-base sm:text-lg font-semibold  rounded-lg bg-muted flex items-center justify-center
                "
                >
                  {activeUsers}
                </div>
                <div className="h-60 overflow-y-auto scrollbar-hide w-full ">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Active Pages</TableHead>
                        <TableHead>Users</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeStatus.map((users) => (
                        <TableRow key={users.page}>
                          <TableCell className="">{users.page}</TableCell>
                          <TableCell className="">{users.users}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>

            <Card
              className={` ${
                isSidebarOpen
                  ? "col-span-3 xl:col-span-2"
                  : " col-span-3 lg:col-span-2"
              }`}
            >
              <div className="flex flex-col gap-5 h-full">
                <h1 className="text-sm sm:text-base font-medium">
                  Income Statistics
                </h1>
                <div className="h-96 bg-muted w-full flex justify-center items-center">
                  Graph
                </div>
              </div>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="rounded-xl">
                    <div className="relative size-10 rounded-full">
                      <Image
                        src={order.photo}
                        alt={order.product}
                        fill
                        className="rounded-xl"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div
                      className={`px-1.5 py-1.5 flex items-center justify-start ${classLink(
                        order.status
                      )}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="bg-white  rounded-full h-6 w-6 flex items-center justify-center ">
                          {order.status === "Completed" ? (
                            <FaCheck className="text-primary size-3" />
                          ) : order.status === "Pending" ? (
                            <RiProgress2Fill className="text-yellow-600 size-4" />
                          ) : (
                            <ImCross className="text-red-700 size-2" />
                          )}
                        </div>

                        <p className="text-white">{order.status}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>

                  <TableCell>
                    <div className="flex items-center  gap-5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link
                              href={`/admin/vendor/orders/${order.id}`}
                              className={cn(
                                buttonVariants({ variant: "outline" }),
                                ""
                              )}
                            >
                              <FaRegEdit className="size-5" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link
                              href={`/admin/vendor/orders/${order.id}`}
                              className={cn(
                                buttonVariants({ variant: "destructive" }),
                                ""
                              )}
                            >
                              {" "}
                              <RiDeleteBinLine className="size-5" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </Card> */}
        </div>
      </Container>{" "}
    </div>
  );
};

export default VendorDashboard;
