"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

interface UserNavbarProps {
  toggleSidebar: () => void;
}

const UserNavbar = ({ toggleSidebar }: UserNavbarProps) => {
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";

  return (
    <>
      <div className="sticky z-50 navbarBgColor w-full">
        <div className="mx-auto px-2.5 md:px-20 w-full">
          <div className=" flex justify-between items-center py-3">
            <div className="flex gap-10 items-center ">
              <Button onClick={toggleSidebar}>
                <GiHamburgerMenu className="text-white" />
              </Button>

              <h1 className="hidden lg:block text-xl font-semibold text-white">
                Good morning, {nameParts[0]}!
              </h1>
            </div>
            <div className="flex items-center gap-5">
              <div className="  items-center justify-between hidden xl:flex max-w-xs rounded-2xl focus-within:ring-ring focus-within:ring-offset-2   focus-within:ring-2">
                <div className="flex items-center bg-white rounded-2xl py-2 px-2">
                  <input
                    type="text"
                    className="text-base px-3 outline-none caret-green-600"
                    placeholder="Search"
                  />
                  <CiSearch className="size-6" />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent rounded-xl p-3">
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
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="hidden 2xl:block">
                      <div className="flex items-center gap-2 ">
                        <h1 className="text-base font-semibold text-white">
                          {fullName}
                        </h1>
                        <FaChevronDown className="text-white" />
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
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
