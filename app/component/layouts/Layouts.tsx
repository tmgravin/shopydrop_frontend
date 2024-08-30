"use client";
import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../../../components/navbar/Navbar";
import UserNavbar from "../admin/user/UserNavbar";
import UserSidebar from "../admin/user/UserSidebar";
import Footer from "@/components/footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if the path starts with "/admin"
  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {/* Render Navbar and Footer only if not on an admin path */}
      {!isAdminPath && <Navbar />}
      {pathname === "/" ? (
        <>
          {children}
        </>
      ) : pathname.startsWith("/admin/user") ? (
        <>
          <div className="flex w-full">
            <aside
              className={`transition-all duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } w-80 fixed top-0 left-0 h-full`}
            >
              <UserSidebar />
            </aside>
            <div
              className={`flex flex-col flex-grow w-full transition-all duration-300 ${
                isSidebarOpen ? "ml-80" : "ml-0"
              }`}
            >
              <UserNavbar toggleSidebar={toggleSidebar} />
              {children}
            </div>
          </div>
        </>
      ) : pathname.startsWith("/admin/vendor") ? (
        <>
          <aside>
            {/* Vendor Sidebar or other components can go here */}
          </aside>
          {children}
        </>
      ) : (
        <div>{children}</div>
      )}
      {/* Render Footer only if not on an admin path */}
      {!isAdminPath && <Footer />}
    </>
  );
};

export default Layouts;
