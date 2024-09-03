"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Vendor {
  id: string;
  name: string;
  mail: string;
  phone: string;
  register: Date;
  address: string;
  password?: string;
}

const data: Vendor[] = [
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#456",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#457",
    name: "Tom Holland",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#458",
    name: "Bruce Lee",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#459",
    name: "John",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#460",
    name: "Captain",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "#461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
];

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: "Vendor Id",
  },
  {
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "mail",
    header: "Login Gmail",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "register",
    header: "Registration",
    cell: ({ row }) => new Date(row.getValue("register")).toLocaleDateString(),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];

const VendorPage = () => {
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
  const maxPageButtons = 3;
  const startPage = Math.max(
    0,
    Math.min(
      Math.max(pagination.pageIndex - Math.floor(maxPageButtons / 2), 0),
      totalPages - maxPageButtons
    )
  );

  const endPage = Math.min(totalPages, startPage + maxPageButtons);

  return (
    <div className="min-h-screen h-full adminUserBg">
      <Container className={cn("", isSidebarOpen ? "md:px-10 lg:px-20" : "")}>
        <div className="flex flex-col gap-12 py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">User Page</h1>
            <Button variant={"destructive"} className="font-semibold px-8 py-4">
              Suspend
            </Button>
          </div>
          <Card>
            <div className="pb-4 flex flex-wrap lg:flex-nowrap w-full gap-2 md:gap-5 justify-between items-center">
              <div className="flex items-center  gap-3">
                <p className="text-sm sm:text-base">Showing</p>
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

                <p className="text-sm sm:text-base">entries</p>
              </div>
              <div
                className={`flex flex-col items-start  w-full justify-between lg:flex-row lg:items-end h-full gap-2 md:gap-5 ${
                  isSidebarOpen
                    ? "md:flex-col md:items-start"
                    : "md:flex-row md:items-center"
                }`}
              >
                <div className="flex w-full gap-2 px-2 md:px-3  items-center border rounded-md focus-within:ring-ring    focus-within:ring-2">
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
                <div className="">
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
                    <TableRow key={row.id}>
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

            <div className="flex flex-wrap gap-10  items-center justify-between pt-6  pb-4 ">
              <div className="flex flex-wrap items-center gap-2 ">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="text-sm sm:text-base "
                >
                  {"<<"}
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="text-xs sm:text-sm md:text-base "
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

                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="text-sm sm:text-base "
                  >
                    {" >"}
                  </Button>
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
              <div className="text-xs sm:text-sm font-medium text-gray-600">
                Showing {table.getState().pagination.pageSize} entries
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default VendorPage;
