"use client";

import { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Container } from "../../app/component/Container";
import Login from "@/app/(auth)/login/page";
import Register from "@/app/(auth)/register/page";
import { CiSearch } from "react-icons/ci";
import HomeSidebar from "../../app/Layout/home-sidebar"; // Adjust the path as needed
import Link from "next/link";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { getCookie } from "@/app/utils/token"; // Import deleteCookie as well
import { deleteCookie } from '../../app/utils/cookies';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CartCount from "./CartCount";
import CartProvider from "@/app/providers/CartProvider";



 const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const sidebarRef = useRef<HTMLDivElement | null>(null);

 useEffect(()=>{
  const token =getCookie('token');
  if(token){
    setIsLoggedIn(true);
  }else{
    setIsLoggedIn(false);
  }
 },[])

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  const handleSidebarToggle :any= () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {// Remove the token cookie on logout
    setIsLoggedIn(false); // Update state to reflect that user is logged out
  };

  // Close the sidebar if a click is detected outside of it
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
    <div className="sticky top-0 z-30 w-full shadow-sm bg-green-400">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between text-white gap-2 md:gap-0">
            <div className="flex justify-between items-center md:gap-10">
              <IoMenu
                className="w-10 h-10 md:w-16 md:h-10 cursor-pointer"
                onClick={handleSidebarToggle}
              />
              <div className="items-center text-center mx-auto">
                <Link href="/">
                  <h1 className="font-bold text-3xl cursor-pointer">Logo</h1>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex gap-24 items-center">
              <div className="hidden md:block md:w-[300px] text-black">
                <div className="flex items-center bg-white rounded-2xl py-2 px-2">
                  <input
                    type="text"
                    className="text-base outline-none caret-green-600"
                    placeholder="Search"
                  />
                  <CiSearch className="size-6 items-end ml-12" />
                </div>
              </div>
              <div className="lg:flex md:hidden gap-1 items-center">
                <p>
                  <AiOutlineThunderbolt className="w-[18px] h-[20px]" />
                </p>
                <p className="text-white font-medium">
                  Order now and get within
                </p>
                <p className="text-red-700">20 Minutes!</p>
              </div>
              
              {!isLoggedIn ? (
                <div className="flex gap-4">
                  <button
                    onClick={handleLoginOpen}
                    className="w-[72px] h-[32px] bg-blue-700 rounded-sm"
                  >
                    Login
                  </button>

                  <button
                    onClick={handleSignUpOpen}
                    className="w-[72px] h-[32px] bg-blue-700 rounded-sm"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 items-center text-center">
                  <div className="flex items-center text-center gap-4">
                    <span><BsTelephoneInboundFill size={36} /></span>
                    <div className="block">
                      <span>Contact</span>
                      <p className="block">0145100</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-[40px] bg-white"></div>
                  <div>
                    <CartProvider>
                    <CartCount/>
                    </CartProvider>
                    
                  </div>
                  <div className="flex gap-3 items-center text-center">
                    <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                      <CiUser size={24} className="text-white" />
                    </div>
                    <button onClick={handleLogout} className="text-xl">
                      LogOut
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 w-[350px] h-full bg-white z-40"
        >
          <HomeSidebar onClose={handleSidebarToggle} />
        </div>
      )}

      {isLoginOpen ? <Login isOpen={isLoginOpen}  onClosed={handleLoginClose} />: null}
      {isSignUpOpen ? <Register isOpen={isSignUpOpen} onClose={handleSignUpClose } />: null}
    </div>
  );
};

export default Navbar;
