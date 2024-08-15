"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React, { useState } from "react";
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="min-h-screen h-full adminUserBg">
      <div className="mx-auto px-2.5 md:px-20 w-full">
        <div className="flex flex-col gap-14 py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Vendor Page</h1>
            <Button variant={"destructive"} className="font-semibold px-8 py-4">
              Block
            </Button>
          </div>
          <Card>
            <div className="pb-2 flex w-full gap-5 justify-between items-center">
              <div className="flex items-center gap-3">
                <h1>Showing</h1>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value={20}>5</option>
                  <option value={20}>10</option>
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
            </div>

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

            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {" "}
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
