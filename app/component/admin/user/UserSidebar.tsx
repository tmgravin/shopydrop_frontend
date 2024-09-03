"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaChevronRight, FaImages } from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RiLogoutBoxLine, RiMenuFold3Line } from "react-icons/ri";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/SidebarProvider";

const UserSidebar = () => {
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const linkClass = (path: string) =>
    pathname === path
      ? "bg-primary text-white  -mx-4 px-4"
      : "hover:bg-primary/30   bg-transparent  -mx-4 px-4";

  return (
    <>
      <div
        className={` ${
          isSidebarOpen ? " px-4 ml-0 w-full min-[400px]:w-80" : "-ml-80  w-80 "
        } bg-white dark:bg-black fixed shrink-0 z-50 top-0 left-0 h-full overflow-y-auto ease-in-out overflow-x-hidden duration-300`}
      >
        {/* <div className="    bg-white h-full z-40"> */}
        <div className="flex flex-col gap-3 py-[14px] border-b borderColor ">
          <div
            className={cn(
              buttonVariants({ variant: "shimmer" }),
              "flex    rounded-md items-center justify-between py-6 "
            )}
          >
            <div className={cn("flex items-center gap-3 py-3 px-3 ")}>
              <div className="relative h-8 w-8">
                <Image src={"/logo.svg"} alt="Logo" fill />
              </div>
              <h1 className="text-2xl font-bold text-white cursor-default  ">
                ShofyDrop
              </h1>
            </div>
            <Button
              onClick={toggleSidebar}
              className="bg-transparent rounded-none hover:bg-transparent"
            >
              <RiMenuFold3Line className="text-2xl text-white" />
            </Button>
          </div>
          <div className="h-40 w-full rounded-xl bg-muted flex justify-center items-center">
            <h1>Banner or Chart</h1>
          </div>
        </div>
        <ul className="px-4 py-4">
          <li className=" border-b  ">
            <Link
              href={"/admin/user/dashboard"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center  rounded-md py-3",
                  linkClass("/admin/user/dashboard")
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
          <li className="  border-b">
            <Link
              href={"/admin/user/vendor"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md py-3",
                  linkClass("/admin/user/vendor")
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
          <li className=" border-b">
            <Link
              href={"/admin/user/user"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md   py-3",
                  linkClass("/admin/user/user")
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
          <li className=" border-b">
            <Link
              href={"/admin/user/update-images"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md   py-3",
                  linkClass("/admin/user/update-images")
                )}
              >
                {" "}
                <div className="flex items-center gap-2">
                  <FaImages className="size-5" />
                  <p className="font-medium">Update Images</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
          <li className=" border-b">
            <Link
              href={"/admin/user/logout"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md   py-3",
                  linkClass("/admin/user/logout")
                )}
              >
                {" "}
                <div className="flex items-center gap-2">
                  <RiLogoutBoxLine className="size-5" />
                  <p className="font-medium">Logout</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
        {/* </div> */}
      </div>
    </>
  );
};

export default UserSidebar;
