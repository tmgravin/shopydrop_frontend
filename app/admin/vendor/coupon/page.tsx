"use client";
import React, { useState } from "react";
import Container from "@/app/component/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Coupon, coupons as data } from "@/app/utils/coupons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiSearch } from "react-icons/ci";
import { useSidebar } from "@/components/SidebarProvider";
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";

// Define Zod schema
const couponSchema: ZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
  discountType: z.enum(["fixed", "negotiable"]),
  discount: z.string().regex(/^\d+$/, "Discount must be a number"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

type CouponFormValues = z.infer<typeof couponSchema>;

const VendorCoupon = () => {
  const columns: ColumnDef<Coupon>[] = [
    { accessorKey: "id", header: "Coupon ID" },
    {
      accessorKey: "title",
      header: "Coupon Title",
    },
    {
      accessorKey: "code",
      header: "Coupon Code",
    },
    {
      accessorKey: "discountType",
      header: "Discount Type",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formatter.format(row.original.startDate);
      },
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
      cell: ({ row }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formatter.format(row.original.expiryDate);
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <form action="" onSubmit={handleSubmit(editFormSubmit)}>
                  <Dialog open={editCouponOpen}>
                    <DialogTrigger
                      asChild
                      onClick={() => setEditCouponOpen(true)}
                    >
                      <div
                        className={cn(buttonVariants({ variant: "outline" }))}
                      >
                        {" "}
                        <FaRegEdit className="text-xl sm:text-2xl" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Coupon</DialogTitle>
                        <DialogDescription>
                          Modify the details below to update the existing
                          coupon.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-2">
                        <Label htmlFor="title" className="mt-2 font-medium">
                          Promo Code Title
                        </Label>
                        <Input id="title" value={row.original.title} />

                        <Label htmlFor="code" className="mt-2 font-medium">
                          Promo Code
                        </Label>
                        <Input id="code" value={row.original.code} />

                        <Label className="mt-2 font-medium">
                          Discount Type
                        </Label>
                        <div className={`relative `}>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="fixed">Fixed</SelectItem>
                                <SelectItem value="negotiable">
                                  Negotiable
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <Label htmlFor="discount" className="mt-2 font-medium">
                          Discount
                        </Label>
                        <Input id="discount" />
                      </div>
                      <DialogFooter className="py-5">
                        <Button type="submit">Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </form>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={cn(buttonVariants({ variant: "destructive" }), "")}
                >
                  <RiDeleteBinLine className="text-xl sm:text-2xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  //Dialog box open and close states
  const [addCouponOpen, setAddCouponOpen] = useState<boolean>(false);
  const [editCouponOpen, setEditCouponOpen] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageSizeHeight: { [key: number]: string } = {
    5: "315px",
    10: "580px",
    20: "1110px",
  };

  const currentPageSizeHeight =
    pageSizeHeight[table.getState().pagination.pageSize] || "500px";

  const totalPages = table.getPageCount();
  const maxPageButtons = 5;
  const startPage = Math.max(
    0,
    Math.min(
      Math.max(pagination.pageIndex - Math.floor(maxPageButtons / 2), 0),
      totalPages - maxPageButtons
    )
  );

  const endPage = Math.min(totalPages, startPage + maxPageButtons);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      startDate,
      endDate,
    },
  });

  //API

  const onSubmit = async (data: CouponFormValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
        data,
        {
          headers: {
            Authorization: `Bearer `,
            "Content-Type": "application/json",
          },
        }
      );
      setAddCouponOpen(false);
      console.log(response.data);
    } catch (err) {
      console.error("Error Submitting Form", err);
    }
    console.log("Submitted Data:", data);
  };

  const editFormSubmit = async (data: CouponFormValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
        data,
        {
          headers: {
            Authorization: `Bearer`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditCouponOpen(false);
      console.log(response.data);
    } catch (err) {
      console.error("Error Editing Form", err);
    }
  };

  return (
    <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
      <div className="flex flex-col gap-10 py-10">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Coupon Code Management
          </h1>
          <div>
            <Dialog open={addCouponOpen}>
              <DialogTrigger asChild onClick={() => setAddCouponOpen(true)}>
                <div
                  className={cn(
                    buttonVariants(),
                    "flex items-center gap-2 max-w-40 cursor-pointer"
                  )}
                >
                  <IoMdAddCircleOutline className="text-xl sm:text-2xl" />
                  <p>Add Coupon</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Coupon</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to create a new coupon.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="mt-2 font-medium">
                      Promo Code Title
                    </Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && (
                      <span className="text-red-500 text-xs sm:text-sm ">
                        {errors.title.message as string}
                      </span>
                    )}

                    <Label htmlFor="code" className="mt-2 font-medium">
                      Promo Code
                    </Label>
                    <Input id="code" {...register("code")} />
                    {errors.code && (
                      <span className="text-red-500 text-xs sm:text-sm ">
                        {errors.code.message as string}
                      </span>
                    )}

                    <Label className="mt-2 font-medium">Discount Type</Label>
                    <div className={`relative `}>
                      <Select
                        onValueChange={(value) =>
                          setValue("discountType", value)
                        }
                        {...register("discountType")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="negotiable">
                              Negotiable
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.discountType && (
                        <span className="text-red-500  text-xs sm:text-sm mt-1 ">
                          {errors.discountType.message as string}
                        </span>
                      )}
                    </div>

                    <Label htmlFor="discount" className="mt-2 font-medium">
                      Discount
                    </Label>
                    <Input id="discount" {...register("discount")} />
                    {errors.discount && (
                      <span className="text-red-500 text-xs sm:text-sm ">
                        {errors.discount.message as string}
                      </span>
                    )}

                    <Label className="mt-2 font-medium">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date);
                            if (date) {
                              setValue("startDate", date);
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Label className="mt-2 font-medium">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            setEndDate(date);
                            if (date) {
                              setValue("endDate", date);
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <DialogFooter className="py-5">
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Card>
          <Card>
            <div className="pb-4 flex flex-wrap lg:flex-nowrap  w-full gap-2 md:gap-5 justify-between items-center">
              <div className="flex items-center gap-3">
                <p className="text-sm sm:text-base ">Showing</p>

                <Select
                  value={table.getState().pagination.pageSize.toString()}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger>
                    <span>{table.getState().pagination.pageSize}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>

                <p className="text-sm sm:text-base ">entries</p>
              </div>
              <div
                className={`flex flex-col items-start gap-2 md:gap-5 w-full   ${
                  isSidebarOpen
                    ? "md:flex-col md:items-start"
                    : "md:flex-row md:items-center"
                } lg:flex-row  lg:items-center`}
              >
                <div className="flex  w-full  gap-2  px-2  md:px-3  items-center border  rounded-md focus-within:ring-ring    focus-within:ring-2">
                  <Input
                    placeholder="Search Name "
                    value={
                      (table.getColumn("title")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("title")
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-full border-none outline-none focus-visible:ring-0 text-xs sm:text-base"
                  />
                  <CiSearch className="size-6" />
                </div>
              </div>
            </div>
            <div className="" style={{ minHeight: currentPageSizeHeight }}>
              <Table className="">
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
            </div>
            <div className="flex flex-wrap items-center gap-10   justify-between  pt-6 pb-4">
              <div className="flex flex-wrap  items-center gap-2">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="text-sm sm:text-base "
                >
                  {"<<"}
                </Button>

                <div className="flex gap-2 ">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="text-sm sm:text-base "
                  >
                    {"<"}
                  </Button>
                  {Array.from({ length: endPage - startPage }, (_, index) => (
                    <Button
                      key={index}
                      variant={
                        startPage + index ===
                        table.getState().pagination.pageIndex
                          ? "default"
                          : "outline"
                      }
                      size={"sm"}
                      onClick={() => table.setPageIndex(startPage + index)}
                      className="text-xs sm:text-sm md:text-base "
                    >
                      {startPage + index + 1}
                    </Button>
                  ))}
                  <div className="flex gap-2">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="text-sm sm:text-base "
                    >
                      {"> "}
                    </Button>
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.setPageIndex(totalPages - 1)}
                  disabled={!table.getCanNextPage}
                  className="text-sm sm:text-base "
                >
                  {">>"}
                </Button>
              </div>
              <div className=" text-xs sm:text-sm font-medium text-gray-600">
                Showing {table.getState().pagination.pageSize} entries
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </Container>
  );
};

export default VendorCoupon;
