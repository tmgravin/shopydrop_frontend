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
import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaEyeSolid } from "react-icons/lia";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

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
  Tooltip,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { products as data, Product, Review } from "@/app/utils/products";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="grid grid-cols-3 items-center max-w-xs ">
        <div className=" rounded-xl ">
          <Image
            src={row.original.images[0].image}
            alt={` Product ${row.original.id}`}
            width={50}
            height={50}
            objectFit="contain"
            className="rounded-xl "
          />
        </div>
        <Link
          href={`/admin/vendor/product/${row.original.id}`}
          className="col-span-2 truncate hover:text-primary"
        >
          {row.original.name}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Product Id",
    cell: ({ row }) => <p>#{row.original.id}</p>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <p>Rs {row.original.price}</p>,
  },

  {
    accessorKey: "sale",
    header: "Sale",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <>
        {/* <div className="text-center">
          {row.original.stock > 0 ? (
            <p className="bg-primary/30 py-2 px-3 rounded-2xl">
              {row.original.stock} in stock
            </p>
          ) : (
            <p className="bg-red-400 py-2 px-3 rounded-2xl">Out of Stock</p>
          )}
        </div> */}
        <div
          className={`py-1.5 px-2 flex items-center justify-start ${
            row.original.stock > 0
              ? "bg-primary rounded-2xl"
              : "bg-red-700 rounded-2xl"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="bg-white  rounded-full h-6 w-6 flex items-center justify-center ">
              {row.original.stock > 0 ? (
                <FaCheck className="text-primary size-3" />
              ) : (
                <ImCross className="text-red-700 size-2" />
              )}
            </div>

            <p className="text-white">{row.original.stock}</p>
          </div>
        </div>
      </>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/admin/vendor/product/${row.original.id}`}
                className={cn(buttonVariants({ variant: "outline" }), "")}
              >
                <LiaEyeSolid className="text-2xl" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/admin/vendor/product/${row.original.id}/edit`}
                className={cn(buttonVariants({ variant: "outline" }), "")}
              >
                {" "}
                <FaRegEdit className="text-2xl" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(buttonVariants({ variant: "destructive" }), "")}
              >
                {" "}
                <RiDeleteBinLine className="text-2xl" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

const Banner: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
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
      <div className="mx-auto px-2.5 md:px-20 w-full">
        <div className="flex flex-col gap-14 py-10">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Product List</h1>
            <div>
              <Link
                href={"/add-product"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-1 items-center"
                )}
              >
                <IoMdAddCircleOutline className="text-2xl" />
                Add Product
              </Link>
            </div>
          </div>

          <Card>
            <div className="pb-2 flex w-full gap-5 justify-between items-center">
              <div className="flex items-center gap-3">
                <h1>Showing</h1>
                <select
                  id="page-size"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <h1>entries</h1>
              </div>

              <div className="flex gap-2 px-3 py-2 items-center border max-w-xs rounded-2xl focus-within:ring-ring    focus-within:ring-2">
                <Input
                  placeholder="Search Name "
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="w-full border-none outline-none focus-visible:ring-0"
                />
                <CiSearch className="size-6" />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filter</SelectLabel>
                      <SelectItem value="A">Option A</SelectItem>
                      <SelectItem value="B">Option B</SelectItem>
                      <SelectItem value="C">Option C</SelectItem>
                      <SelectItem value="D">Option D</SelectItem>
                      <SelectItem value="E">Option E</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="" style={{ minHeight: currentPageSizeHeight }}>
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
            </div>

            <div className="flex flex-wrap gap-10  items-center justify-between space-x-2 pt-6 pb-4 ">
              <div className="flex  items-center space-x-2">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </Button>

                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
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
                  >
                    {startPage + index + 1}
                  </Button>
                ))}

                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {" "}
                  Next
                </Button>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.setPageIndex(totalPages - 1)}
                  disabled={!table.getCanNextPage}
                >
                  {">>"}
                </Button>
              </div>
              <div className="text-sm font-medium text-gray-600">
                Showing {table.getState().pagination.pageSize} entries
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Banner;
