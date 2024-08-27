"use client";
import { Card } from "@/components/ui/card";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { orderTracking, OrderTrackingStage } from "@/app/utils/order-tracking";
import { orders } from "@/app/utils/orders";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";

interface PageParams {
  params: {
    orderId: string;
  };
}

const columns: ColumnDef<OrderTrackingStage>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return row.original.date ? formatter.format(row.original.date) : "-";
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeStyle: "medium",
      });

      return row.original.time ? formatter.format(row.original.time) : "-";
    },
  },
  {
    accessorKey: "description",
    header: "Product Id",
    cell: ({ row }) => <p>{row.original.description}</p>,
  },
];
const ProgressTracker = ({ stages }: { stages: OrderTrackingStage[] }) => {
  const formatter = new Intl.DateTimeFormat("en-US", { timeStyle: "medium" });

  // Calculate the percentage of completed stages
  const completedStages = stages.filter((stage) => stage.completed).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  return (
    <div className="relative w-full flex flex-none flex-col items-center pt-10  min-w-[40rem]">
      <div className="relative w-full grid grid-cols-5 ">
        {stages.map((stage, index) => {
          // Determine if the current stage should have the "default" variant
          const isCompleted =
            (index + 1) * (100 / stages.length) <= progressPercentage;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white dark:bg-black rounded-full  w-20 justify-center mx-auto z-10"
            >
              <Button
                className={cn(`p-4 z-20 cursor-default rounded-full size-20`)}
                variant={isCompleted ? "default" : "outline"}
              >
                <FaCheck className="text-xl sm:text-2xl" />
              </Button>
            </div>
          );
        })}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 z-0">
          <div
            className="h-full bg-primary animate-progress"
            style={
              {
                "--progress-width": `${progressPercentage}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
      <div className="relative w-full grid grid-cols-5">
        {stages.map((stage, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <h2 className="pt-5 font-semibold  text-sm sm:text-base">
              {stage.stage}
            </h2>
            <h3 className="text-xs sm:text-sm pt-2">
              {stage.date ? formatter.format(stage.date) : "Processing"}
            </h3>
            {index < stages.length - 1 && (
              <div className="w-6 h-0.5 transition-colors duration-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderTracking = ({ params }: PageParams) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { orderId } = params;

  const order = orders.find((order) => order.id === orderId);

  const orderTrack = orderTracking.find((order) => order.id === orderId);

  const data: OrderTrackingStage[] = orderTrack?.stages ?? [];

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen h-full ">
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col gap-14 py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Order Tracking
            </h1>
          </div>
          <div className="">
            <div className="flex items-center text-center gap-4  font-medium">
              <Link
                href={"/admin/vendor/orders/order-list"}
                className=" hover:text-primary"
              >
                Order
              </Link>
              <FaChevronRight />{" "}
              <Link
                href={`/admin/vendor/orders/${order?.id}`}
                className=" hover:text-primary"
              >
                Order {order?.id}
              </Link>
              <FaChevronRight /> <p className="text-gray-500">Order tracking</p>
            </div>
          </div>

          <Card>
            <div className="grid">
              {/* <Image src={} height={300} width={300} alt={}/> */}
              <div>
                <h1></h1>
                <div className="grid grid-cols-2 max-w-sm">
                  <p>Order Id:</p>
                  <p>#{orderId}</p>

                  <p>Order Placed:</p>
                  <p>{formatter.format(order?.date)}</p>
                </div>
                {/* <Link
                  href={"vendor/product/product-list"}
                  className={cn(buttonVariants())}
                >
                  View Shop
                </Link>
                <Link
                  href={`vendor/product/product-list`}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  View Product
                </Link> */}
              </div>
            </div>
          </Card>

          <Card className=" ">
            <div className="flex flex-col ">
              <h1 className="text-lg sm:text-xl font-semibold">Detail</h1>
              <p className="text-secondary-foreground text-xs sm:text-sm">
                Your items is on the way. Tracking information will be available
                within 30 minutes.
              </p>
              <div className="overflow-auto">
                <ProgressTracker stages={data} />
              </div>
            </div>
          </Card>

          <Card>
            <Table>
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
              <TableBody className="font-medium">
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default OrderTracking;
