"use client";
import Container from "@/app/component/Container";
import { customers } from "@/app/utils/customers";
import { orders } from "@/app/utils/orders";
import { useSidebar } from "@/components/SidebarProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

interface PageProps {
  params: {
    customerId: string;
  };
}

const CustomerDetails = ({ params }: PageProps) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { customerId } = params;

  const customer = customers.find((customer) => customer.id === customerId);

  //   Get All the Orders of Customer
  const customerOrders = orders.filter(
    (order) => order.customer === customer?.name
  );

  const totalSpent = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;

  //   Date Format
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //Average Order Value
  let averageOrderValue = totalSpent / totalOrders;

  //   Last Order
  let lastOrder = customerOrders[customerOrders.length - 1];

  //   Difference in Date
  let today: Date = new Date();

  let diffInMilli: number = today.getTime() - lastOrder.date.getTime();

  // Convert milliseconds to days
  const diffInDays: number = Math.floor(diffInMilli / (1000 * 60 * 60 * 24));

  return (
    <>
      <div>
        <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
          <div className=" flex flex-col gap-10 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Customer Details
              </h1>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/customer/${customer?.id}/edit`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          ""
                        )}
                      >
                        {" "}
                        <FaRegEdit className="text-xl sm:text-2xl" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          buttonVariants({ variant: "destructive" }),
                          ""
                        )}
                      >
                        {" "}
                        <RiDeleteBinLine className="text-xl sm:text-2xl" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="">
              <div className="flex gap-4 items-center font-medium">
                <Link
                  href={"/admin/vendor/customer/customer-list"}
                  className=" hover:text-primary"
                >
                  Customer
                </Link>{" "}
                <FaChevronRight />{" "}
                <p className="text-gray-500">{customer?.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[20px]">
              <Card
                className={`${
                  isSidebarOpen
                    ? "col-span-2 xl:row-span-2"
                    : "col-span-2 lg:col-span-1"
                } `}
              >
                <div className="flex flex-col  items-center">
                  <Image
                    src={`${customer?.image}`}
                    alt={`${customer?.name}`}
                    height={200}
                    width={200}
                    className="rounded-full"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold mt-2 text-primary">
                    {customer?.name}
                  </h2>
                  <p>{customer?.email}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {customer?.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-5 py-5">
                  <div>
                    <h2 className="text-lg font-medium">Last Order</h2>
                    <h3 className="text-secondary-foreground">
                      {diffInDays} days ago -{" "}
                      <span className="text-primary">#{lastOrder.id}</span>
                    </h3>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">Average Order Value</h2>
                    <h3 className="text-secondary-foreground">
                      Rs {averageOrderValue}
                    </h3>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">Registered</h2>
                    <h3 className="text-secondary-foreground">
                      {formatter.format(customer?.registered)}
                    </h3>
                  </div>
                </div>
              </Card>
              <Card
                className={`${
                  isSidebarOpen
                    ? "col-span-2 xl:col-span-1"
                    : "col-span-2 lg:col-span-1"
                }`}
              >
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold  ">
                      Orders
                    </h2>
                    <p className=" text-secondary-foreground text-sm sm:text-base">
                      Total Spent Rs {totalSpent} on {totalOrders} orders
                    </p>
                  </div>
                  <div className="max-h-72 w-full overflow-auto mt-5 scrollbar-hide">
                    <Table className=" ">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order Id</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="">
                        {customerOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="text-primary">
                              #{order.id}
                            </TableCell>
                            <TableCell>
                              {formatter.format(order.date)}
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Card>
              <Card
                className={`${
                  isSidebarOpen
                    ? "col-span-2 xl:col-span-1"
                    : " col-span-2 lg:col-span-1"
                }`}
              >
                <div className="flex justify-between ">
                  <h2 className="text-lg sm:text-xl font-semibold mt-2 ">
                    Addresses
                  </h2>
                  <Button className="" variant={"secondary"}>
                    New Address
                  </Button>
                </div>
                <div className="mt-5">
                  <div className="flex flex-col sm:flex-row  gap-2 sm:items-center">
                    <p className="text-md font-semibold">{customer?.name}</p>
                    <p>{customer?.phone}</p>
                  </div>
                  <p>{customer?.billingAddress}</p>
                </div>
                <div className="mt-5">
                  <div className="flex flex-col sm:flex-row  gap-2 sm:items-center">
                    <p className="text-md font-semibold">{customer?.name}</p>
                    <p>{customer?.phone}</p>
                  </div>
                  <p>{customer?.shippingAddress}</p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CustomerDetails;
