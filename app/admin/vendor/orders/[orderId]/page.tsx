"use client";
import Container from "@/app/component/Container";
import { customers } from "@/app/utils/customers";
import { Order, orders } from "@/app/utils/orders";
import { Product, products } from "@/app/utils/products";
import { transactions } from "@/app/utils/transactions";
import { useSidebar } from "@/components/SidebarProvider";
import { buttonVariants } from "@/components/ui/button";
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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

interface PageProps {
  params: {
    orderId: string;
  };
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Photo",
    cell: ({ row }) => (
      <Image
        src={row.original.images[0].image}
        alt={`${row.original.id} Image`}
        height={50}
        width={50}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <> {row.original.quantity} Kg</>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <>Rs {row.original.price}</>,
  },
];

function getProductsByOrder(order: Order | undefined, products: Product[]) {
  if (!order) return [];
  return order?.productId
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is Product => !!product);
}

function subTotal(products: Product[]) {
  return products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
}

const OrderDetails = ({ params }: PageProps) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { orderId } = params;

  const order = orders.find((order) => order.id === orderId);

  const customer = customers.find(
    (customer) => customer.name === order?.customer
  );

  // const data = getProductsByOrder(order, products);
  const data = useMemo(
    () => getProductsByOrder(order, products),
    [order, products]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const subTotalPrice = subTotal(data);

  const discount = 70;
  const delivery = 50;

  const totalPrice = subTotalPrice + discount + delivery;

  const returnTotal = 0.0;

  const paidByCustomer = 500;
  const refunded = 0;
  const balance = Math.abs(totalPrice - paidByCustomer);

  const transactionDetail = transactions.find(
    (transaction) => transaction.orderId === orderId
  );

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col py-10 gap-10">
          <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Order details</h1>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/vendor/orders/${order?.id}/order-tracking`}
                className={cn(
                  buttonVariants(),
                  "w-full flex items-center gap-2 max-w-48"
                )}
              >
                <TbTruckDelivery className="text-xl sm:text-2xl" />
                <p> Order Tracking</p>
              </Link>

              <TooltipProvider>
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
            <div className="flex gap-4 items-baseline font-medium">
              <Link
                href={"/admin/vendor/orders/order-list"}
                className=" hover:text-primary"
              >
                Order
              </Link>
              <FaChevronRight />{" "}
              <p className="text-gray-500">Order {order?.id}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Card
              className={` ${
                isSidebarOpen
                  ? "col-span-2 xl:col-span-1"
                  : "col-span-2 lg:col-span-1"
              } row-span-3 `}
            >
              <h1 className="text-base sm:text-lg font-semibold">All Item</h1>
              <div className=" max-h-96  overflow-auto scrollbar-thin">
                <Table className="mt-2">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="font-medium text-gray-600"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody className="font-medium ">
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="max-w-sm text-wrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Total Price */}
              <section className="flex flex-col mt-10 ">
                <div className="flex justify-between items-center">
                  <p className="">Sub Total</p>
                  <p>Rs {subTotalPrice}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <p className="">Discount</p>
                  <p>Rs {discount}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <p className="">Delivery</p>
                  <p>Rs {delivery}</p>
                </div>
                <div className="flex font-semibold border-t-2 pt-2 mt-3 justify-between items-center">
                  <p className="">Total Price</p>
                  <p>Rs {totalPrice}</p>
                </div>
              </section>
            </Card>
            <Card
              className={`flex flex-col gap-5 ${
                isSidebarOpen
                  ? "col-span-2 lg:col-span-1"
                  : "col-span-2 md:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-base sm:text-lg  font-semibold">
                  Customer
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/product/${order?.id}`}
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
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={`${customer?.image}`}
                  alt={`${customer?.name}`}
                  height={60}
                  width={60}
                  className={"rounded-full"}
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium">
                    {customer?.name}
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className={`flex flex-col gap-5 ${
                isSidebarOpen
                  ? "col-span-2 lg:col-span-1"
                  : "col-span-2 md:col-span-1"
              } `}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-base sm:text-lg font-semibold">
                  Contact Person
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/product/${order?.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          ""
                        )}
                      >
                        {" "}
                        <FaRegEdit className="text-2xl" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.name}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.email}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.phone}
                </p>
              </div>
            </Card>
            <Card
              className={`flex flex-col gap-5 order-3 ${
                isSidebarOpen
                  ? "col-span-2 lg:col-span-1"
                  : "col-span-2 md:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between ">
                <h1 className="text-base sm:text-lg font-semibold">
                  Shipping Address
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/product/${order?.id}`}
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
                </TooltipProvider>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.name}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.shippingAddress}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.shippingCity}
                </p>
              </div>
            </Card>
            <Card
              className={`flex flex-col gap-5  ${
                isSidebarOpen
                  ? "col-span-2 xl:col-span-1"
                  : "col-span-2 lg:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-base sm:text-lg font-semibold">
                  Transactions
                </h1>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="font-medium">
                    <TableCell> via {transactionDetail?.paymentType}</TableCell>
                    <TableCell>
                      {formatter.format(transactionDetail?.date)}
                    </TableCell>
                    <TableCell>{transactionDetail?.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card
              className={`flex flex-col ${
                isSidebarOpen
                  ? "col-span-2 xl:col-span-1"
                  : "col-span-2 lg:col-span-1"
              } `}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-base sm:text-lg font-semibold">Balance</h1>
              </div>

              {/* Total Price */}
              <section className="flex flex-col  mt-5">
                <div className="flex justify-between items-center">
                  <p className="">Order Total</p>
                  <p>Rs {totalPrice}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <p className="">Return Total</p>
                  <p>Rs {returnTotal}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <p className="">Paid by Customer</p>
                  <p>Rs {paidByCustomer}</p>
                </div>
                <div className="flex pt-4 justify-between items-center">
                  <p className="">Refunded</p>
                  <p>Rs {refunded}</p>
                </div>
                <div className="flex font-semibold border-t-2 pt-2 mt-3 justify-between items-center">
                  <p className="">
                    Balance{" "}
                    <span className="text-xs sm:text-sm text-gray-500">
                      (Customer owes you)
                    </span>
                  </p>
                  <p>Rs {balance}</p>
                </div>
              </section>
            </Card>
            <Card
              className={`flex flex-col gap-5 ${
                isSidebarOpen
                  ? "col-span-2 lg:col-span-1"
                  : "col-span-2 md:col-span-1"
              }`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-base sm:text-lg font-semibold">
                  Billing Address
                </h1>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/vendor/product/${order?.id}`}
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
                </TooltipProvider>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.name}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.billingAddress}
                </p>
                <p className="text-xs sm:text-sm font-medium">
                  {customer?.billingCity}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderDetails;
