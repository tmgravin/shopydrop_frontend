"use client";

// import { useSidebar } from "@/components/SidebarProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMenuUnfold3Line } from "react-icons/ri";
import UserSidebar from "./UserSidebar";
import { useSidebar } from "@/components/SidebarProvider";
import { cn } from "@/lib/utils";
import Container from "../../Container";

const UserNavbar = () => {
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <div className="sticky z-30 bg-primary w-full  whitespace-nowrap  ">
        <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
          <div className=" flex  items-center py-3 ">
            <div
              className={cn(
                `${
                  isSidebarOpen ? "opacity-0  hidden" : "opacity-100 "
                } flex gap-10 items-center`
              )}
            >
              <Button
                onClick={toggleSidebar}
                className={cn(
                  `${
                    isSidebarOpen ? "opacity-0  hidden" : "opacity-100 "
                  } transition-all duration-100 border-none`
                )}
              >
                <RiMenuUnfold3Line className="text-white text-2xl" />
              </Button>
            </div>

            <h1
              className={`hidden transition-all duration-100  text-xl whitespace-nowrap font-semibold text-white mx-auto ${
                isSidebarOpen ? "  lg:hidden " : " lg:block "
              }`}
            >
              Good morning, {nameParts[0]}!
            </h1>
            <div className=" ml-auto flex items-center gap-4 max-w-max whitespace-nowrap">
              <div className="  items-center justify-between hidden lg:flex max-w-xs rounded-full focus-within:ring-ring focus-within:ring-offset-2   focus-within:ring-2">
                <div className="flex items-center bg-muted rounded-full py-2 px-2">
                  <input
                    type="text"
                    className="text-base px-3 outline-none caret-primary bg-muted"
                    placeholder="Search"
                  />
                  <CiSearch className="size-6" />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent rounded-xl p-1.5">
                    <FiBell className="size-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-10">
                  Hello
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Vertical Line */}
              <div className=" h-14  border-l"></div>
              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="  flex  gap-2 items-center cursor-pointer">
                    <div className="relative  size-12 bg-white rounded-full ">
                      <Image
                        src={pic}
                        alt="User Photo"
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div
                      className={`  hidden sm:block ${isSidebarOpen ? "" : ""}`}
                    >
                      <div className="flex items-center gap-2 ">
                        <h1 className="text-base font-semibold text-white">
                          {fullName}
                        </h1>
                        {/* <FaChevronDown className="text-white" /> */}
                      </div>
                      <p className="text-white text-xs">Admin</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  Hello
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserNavbar;
