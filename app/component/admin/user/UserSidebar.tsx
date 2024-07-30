"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const UserSidebar = () => {
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-black/50 text-white -mx-4 px-4"
      : "text-black bg-transparent";

  return (
    <>
      <div className="h-full  pt-6">
        <div className="flex flex-col gap-5 py-3 border-b borderColor px-4">
          <div className="flex bg-green-600 items-center gap-3 py-3 px-3 rounded-xl">
            <div className="relative h-10 w-10">
              <Image src={"/logo.svg"} alt="Logo" fill />
            </div>
            <h1 className="text-3xl font-bold text-white  ">ShofyDrop</h1>
          </div>
          <div className="h-40 w-full rounded-xl bg-gray-200 flex justify-center items-center">
            <h1>Banner or Chart</h1>
          </div>
        </div>
        <ul className="px-4">
          <li className="sidebarBorderColor border-b py-2 ">
            <Link href={"/user/dashboard"}>
              <div
                className={cn(
                  "flex justify-between items-center   py-2",
                  linkClass("/user/dashboard")
                )}
              >
                <div className="flex items-center gap-2">
                  <TfiDashboard className="size-5" />
                  <p className="font-medium">Dashboard</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
          <li className="sidebarBorderColor py-2 border-b">
            <Link href={"/user/vendor"}>
              <div
                className={cn(
                  "flex justify-between items-center py-2",
                  linkClass("/user/vendor")
                )}
              >
                {" "}
                <div className="flex items-center gap-2">
                  <FiUser className="size-5" />
                  <p className="font-medium">Vendor Page</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
          <li className="sidebarBorderColor py-2 border-b">
            <Link href={"/user/user"}>
              <div
                className={cn(
                  "flex justify-between items-center   py-2",
                  linkClass("/user/user")
                )}
              >
                {" "}
                <div className="flex items-center gap-2">
                  <LuUsers className="size-5" />
                  <p className="font-medium">User Page</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserSidebar;
