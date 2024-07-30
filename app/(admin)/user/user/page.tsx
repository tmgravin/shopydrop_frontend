"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
    id: "458",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "459",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "460",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "461",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "462",
    name: "Riya Neupane",
    mail: "riya@gmail.com",
    phone: "9809745746",
    register: new Date("2024-05-15"),
    address: "Gaushala",
    password: "hashed",
  },
  {
    id: "463",
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vendor.id)}
            >
              Copy Vendor ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Delete Vendor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const VendorPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    <>
      <div className=" min-h-screen h-full adminUserBg">
        <div className="mx-auto px-2.5 md:px-20 w-full">
          <div className=" flex flex-col gap-14 py-10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Vendor Page</h1>
              <Button
                variant={"destructive"}
                className="font-semibold px-8 py-4"
              >
                Block
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor Id</TableHead>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Login Gmail</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {tableData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Image
                            src={`${data.img}`}
                            alt={data.name}
                            height={50}
                            width={50}
                            className="rounded-full"
                          />
                          {data.name}
                        </div>
                      </TableCell>
                      <TableCell>{data.order}</TableCell>
                      <TableCell>{data.amount}</TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <span>Profile</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default VendorPage;
