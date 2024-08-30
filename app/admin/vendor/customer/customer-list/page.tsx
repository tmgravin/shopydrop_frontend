"use client";
import Container from "@/app/component/Container";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Customer, customers as data } from "@/app/utils/customers";
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
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LiaEyeSolid } from "react-icons/lia";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { format } from "date-fns";
import { useSidebar } from "@/components/SidebarProvider";

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <>
        <Link
          href={`/admin/vendor/customer/${row.original.id}`}
          className="hover:text-primary"
        >
          {row.original.name}
        </Link>
      </>
    ),
  },

  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => (
      <div>
        <Image
          src={row.original.image}
          alt={`Order ${row.original.id}`}
          width={50}
          height={50}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
  },

  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/admin/vendor/customer/${row.original.id}`}
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
            <TooltipTrigger>
              <Link
                href={`/admin/vendor/customer/${row.original.id}/edit`}
                className={cn(buttonVariants({ variant: "outline" }), "")}
              >
                <FaRegEdit className="text-xl sm:text-2xl" />
              </Link>
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

const CustomerList = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
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

  return (
    <>
      {/* Max Width Wrapper/Container */}
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="pt-14 flex flex-col gap-14 py-10">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between ">
            <h1 className="text-xl sm:text-2xl font-semibold">Customer List</h1>
            <Link
              href={"/admin/vendor/customer/add-customer"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex gap-1 items-center max-w-40"
              )}
            >
              <IoMdAddCircleOutline className="text-xl sm:text-2xl" />
              Add Customer
            </Link>
          </div>
          {/* Table */}
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
                    className="w-full border-none outline-none focus-visible:ring-0 text-xs sm:text-base"
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
                      className="text-sm sm:text-base "
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
    </>
  );
};

export default CustomerList;
