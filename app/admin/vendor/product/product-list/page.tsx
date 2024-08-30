"use client";
import { Card } from "@/components/ui/card";
import { ImCross } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaEyeSolid } from "react-icons/lia";

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

import { products as data, Product } from "@/app/utils/products";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
import axios from "axios";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="grid grid-cols-3 items-center max-w-xs min-w-60 ">
        <div className=" rounded-xl ">
          <Image
            src={row.original.images[0].image}
            alt={` Product ${row.original.id}`}
            width={50}
            height={50}
            style={{ objectFit: "contain" }}
            className="rounded-xl "
          />
        </div>
        <Link
          href={`/admin/vendor/product/${row.original.id}`}
          className="col-span-2 truncate hover:text-primary "
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
                <LiaEyeSolid className="text-xl sm:text-2xl" />
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
                className={cn(buttonVariants({ variant: "destructive" }), "")}
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
    ),
  },
];

const ProductList: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [token, setToken] = useState<String | null>(null);
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

  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/security/login`,
        {
          email: "vendor1@gmail.com",
          password: "123",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.jwtToken);

      console.log(response.data.jwtToken);
    } catch (err) {
      console.log("Process env: ", process.env.NEXT_PUBLIC_BASE_URL);
      console.error("Login request failed:", err);
    }
  };

  const fetchProducts = async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching Products", err);
        if (axios.isAxiosError(err)) {
          console.error("Axios Error:", err.message);
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
        } else if (err instanceof Error) {
          console.error("General Error:", err.message);
        } else {
          console.error("Unexpected Error", err);
        }
      }
    }
  };

  return (
    <div className="min-h-screen h-full ">
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col gap-14 py-10">
          <div className="flex flex-col gap-10 sm:flex-row justify-between sm:items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Product List</h1>
            <div>
              <Link
                href={"/admin/vendor/product/add-product"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex gap-1 items-center max-w-40"
                )}
              >
                <IoMdAddCircleOutline className="text-xl sm:text-2xl" />
                Add Product
              </Link>
            </div>
            <button onClick={login}>Login</button>
            <button onClick={fetchProducts}>Get Products </button>
          </div>

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
                      (table.getColumn("name")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("name")
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-full border-none outline-none focus-visible:ring-0 text-xs md:text-base"
                  />
                  <CiSearch className="size-6" />
                </div>
                <div className="flex justify-end">
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
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
