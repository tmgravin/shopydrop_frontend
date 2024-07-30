"use client";
import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarItems } from "@/lib/types";
import { CiHome } from "react-icons/ci"; // Import your icon
import { Navbar } from "../../component/navbar/Navbar";
import SidebarNavbar from "../../component/navbar/SidebarNavbar";
import UserNavbar from "../admin/user/UserNavbar";
import UserSidebar from "../admin/user/UserSidebar";
import Footer from "../../component/footer/Footer";
import VendorNavbar from "../admin/vendor/VendorNavbar";
import VendorSidebar from "../admin/vendor/VendorSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define sidebarItems with correct type
  const sidebarItems: SidebarItems = {
    Links: [
      {
        label: "Home",
        href: "/order", // Correct URL path
        icon: <CiHome />, // Use an appropriate icon
      },
      {
        label: "About",
        href: "/about",
        icon: <CiHome />, // Example icon, replace as needed
      },
      {
        label: "About",
        href: "/about",
        icon: <CiHome />, // Example icon, replace as needed
      },
      {
        label: "About",
        href: "/about",
        icon: <CiHome />, // Example icon, replace as needed
      },

      // Add more items as needed
    ],
  };
  return (
    <>
      {pathname === "/" ? (
        <>
          {" "}
          <Navbar />
          {/* Pass sidebarItems to SidebarNavbar */}
          <aside>
            <SidebarNavbar sidebarItems={sidebarItems} />
          </aside>
          {children}
        </>
      ) : pathname.startsWith("/user") ? (
        <>
          <div className="flex w-full">
            <aside
              className={` transition-all duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } w-80 fixed top-0 left-0 h-full `}
            >
              <UserSidebar />
            </aside>
            <div
              className={`flex flex-col flex-grow w-full transition-all duration-300 ${
                isSidebarOpen ? "ml-80" : "ml-0"
              } `}
            >
              <UserNavbar toggleSidebar={toggleSidebar} />
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <VendorNavbar />
          <aside>
            <VendorSidebar />
          </aside>
          {children}
        </>
      )}
      {pathname === "/" ? (
        <>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default Layouts;
