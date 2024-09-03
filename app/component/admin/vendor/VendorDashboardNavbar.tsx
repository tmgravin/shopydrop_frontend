"use client";
import { useSidebar } from "@/components/SidebarProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiBell, FiMessageSquare, FiSettings } from "react-icons/fi";
import { RiMenuUnfold3Line } from "react-icons/ri";
import Container from "../../Container";
import { axiosInstance } from "@/app/utils/axiosInstances";
import {
  getUserFromCookies,
  setUserCookie,
  clearCookies,
} from "@/app/utils/cookies";
import { cn } from "@/lib/utils";

const VendorDashboardNavbar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";
  const [user, setUser] = useState<any>(getUserFromCookies()); // Initialize with current user
  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  const login = async () => {
    try {
      const response = await axiosInstance.post("/api/security/login", {
        email: "vendor1@gmail.com",
        password: "123",
      });
      console.log(response.data);
      setUserCookie(response.data);
      setUser(getUserFromCookies());
    } catch (err) {
      console.error("Error Login", err);
    }
  };

  return (
    <>
      <div className="sticky z-30 bg-primary w-full">
        <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
          <div className=" flex justify-between items-center py-3 ">
            <Button
              onClick={toggleSidebar}
              className={`${isSidebarOpen ? "hidden" : ""}`}
            >
              <RiMenuUnfold3Line className="text-white text-2xl" />
            </Button>

            <div className=" ml-auto flex items-center gap-5">
              <div className="  items-center justify-between hidden xl:flex max-w-xs rounded-full focus-within:ring-ring focus-within:ring-offset-2   focus-within:ring-2">
                <div className="flex items-center bg-muted rounded-full py-2 px-2">
                  <input
                    type="text"
                    className="text-base px-3 outline-none caret-primary bg-muted"
                    placeholder="Search"
                  />
                  <CiSearch className="size-6" />
                </div>
              </div>
              <div
                className={`${
                  isSidebarOpen ? "hidden sm:flex " : ""
                } hidden sm:flex items-center justify-between gap-1`}
              >
                <Button
                  variant="default"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative bg-transparent rounded-full "
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white size-8" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white size-8 " />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-transparent rounded-xl p-3">
                      <FiMessageSquare className="size-6 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-10">
                    Hello
                  </DropdownMenuContent>
                </DropdownMenu>

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
              </div>
              {/* Vertical Line */}
              <div
                className={`${
                  isSidebarOpen ? " hidden sm:flex" : " hidden sm:flex "
                } h-10  border-l`}
              ></div>
              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={` ${
                      isSidebarOpen ? "hidden sm:flex" : ""
                    } flex  gap-2 items-center cursor-pointer`}
                  >
                    <div className="relative  size-12 bg-white rounded-full ">
                      <Image
                        src={pic}
                        alt="User Photo"
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <h1 className="text-base font-semibold text-white">
                        {fullName}
                      </h1>
                      <p className="text-white text-xs">Admin</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  Hello
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent rounded-xl p-3">
                    <FiSettings className="text-white size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-10">
                  Hello
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button onClick={login} className={cn(``)}>
              Login
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default VendorDashboardNavbar;
