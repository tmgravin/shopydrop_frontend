"use client";

import { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Container } from "@/app/component/Container";
import Login from "@/app/(auth)/login/page";
import Register from "@/app/(auth)/register/page";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import HomeSidebar from "@/app/Layout/home-sidebar";
import Link from "next/link";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { getCookie, deleteCookie } from "@/app/utils/cookies";
import { Dialog } from "@/components/ui/dialog";
import CartCount from "./CartCount";
import CartProvider from "@/app/providers/CartProvider";
// import { axiosInstance } from "@/app/utils/api";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onClose: () => void;
}

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : undefined;

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const handleSignUpClose = () => setIsSignUpOpen(false);
  const handleSidebarToggle = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    try {
      // const response = await axiosInstance.post("security/logout");
      // if (response.status === 200) {
      //   deleteCookie("token");
      //   deleteCookie("user");
      //   console.log("Logout successful");
      // } else {
      //   console.log("Logout failed");
      // }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="sticky top-0 z-30 w-full bg-green-500 shadow-lg">
      <div className="py-4 border-b-[1px] border-green-700">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center text-white gap-4">
            <div className="flex justify-between items-center w-full md:w-auto">
              <IoMenu
                className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                onClick={handleSidebarToggle}
              />
              <Link href="/" className="text-center mx-auto md:mx-0">
                <h1 className="font-bold text-2xl md:text-3xl cursor-pointer">Logo</h1>
              </Link>
            </div>

            <div className="hidden md:flex gap-10 items-center w-full md:w-auto">
              <div className="hidden md:flex items-center bg-white rounded-full p-2 w-full md:w-80 lg:w-[300px]">
                <input
                  type="text"
                  className="flex-1 text-black text-sm md:text-base outline-none caret-green-600"
                  placeholder="Search"
                />
                <CiSearch className="text-xl text-gray-500" />
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineThunderbolt className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">
                  Order now and get within <span className="text-red-500 font-bold">20 Minutes!</span>
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center w-full md:w-auto justify-end">
              {isLoggedIn ? (
                <>
                  <div className="hidden md:flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <BsTelephoneInboundFill size={24} className="text-yellow-400" />
                      <div className="flex flex-col">
                        <span>Contact</span>
                        <span className="font-semibold">0145100</span>
                      </div>
                    </div>
                    <CartProvider>
                      <CartCount onClick={() => setIsCartSidebarOpen(!isCartSidebarOpen)} />
                    </CartProvider>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                        <CiUser size={24} className="text-white" />
                      </div>
                      <button onClick={handleLogout} className="text-lg font-semibold">
                        LogOut
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginOpen}
                    className="px-4 py-2 bg-blue-700 text-sm rounded-full hover:bg-blue-800 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUpOpen}
                    className="px-4 py-2 bg-blue-700 text-sm rounded-full hover:bg-blue-800 transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {isSidebarOpen && (
        <div ref={sidebarRef} className="fixed top-0 left-0 w-64 md:w-[350px] h-full bg-white z-40 shadow-lg">
          <HomeSidebar onClose={handleSidebarToggle} />
        </div>
      )}

      {isLoginOpen && <Login isOpen={isLoginOpen} onClose={handleLoginClose} />}
      {isSignUpOpen && <Register isOpen={isSignUpOpen} onClose={handleSignUpClose} />}
    </div>
  );
};

export default Navbar;
