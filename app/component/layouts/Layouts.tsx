"use client";
import { useSidebar } from "@/components/SidebarProvider";
import { SidebarItems } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { CiHome } from "react-icons/ci";
import Footer from "../../component/footer/Footer";
import { Navbar } from "../../component/navbar/Navbar";
import UserNavbar from "../admin/user/UserNavbar";
import SidebarNavbar from "../../component/navbar/SidebarNavbar";
import VendorNavbar from "../admin/vendor/VendorNavbar";
import UserSidebar from "../admin/user/UserSidebar";
import VendorSidebar from "../admin/vendor/VendorSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

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
      ) : pathname.startsWith("/admin/user") ? (
        <>
          <div className={`flex  w-full overflow-hidden `}>
            {/* User Sidebar */}
            <aside>
              <UserSidebar />
            </aside>
            <div
              className={`flex flex-col flex-grow w-full ease-in-out duration-300 ${
                isSidebarOpen ? "pl-80" : "pl-0"
              }`}
            >
              {/* Overlay */}
              <div
                className={cn(
                  `fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full border  `,
                  {
                    "bg-opacity-70 block md:hidden ": isSidebarOpen,
                  }
                )}
                onClick={() => toggleSidebar()}
              ></div>
              {/* User Navbar */}

              <UserNavbar />

              {/* Main Content */}
              <div
                className={cn(`flex-grow flex-1  `, {
                  "min-w-max sm:min-w-full": isSidebarOpen,
                })}
              >
                {children}
              </div>
            </div>
          </div>
        </>
      ) : pathname.startsWith("/admin/vendor") ? (
        <>
          <div className={`flex  w-full overflow-hidden `}>
            {/* User Sidebar */}
            <aside>
              <VendorSidebar />
            </aside>
            <div
              className={`flex flex-col flex-grow w-full ease-in-out duration-300 ${
                isSidebarOpen ? "pl-80" : "pl-0"
              }`}
            >
              {/* Overlay */}
              <div
                className={cn(
                  `fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full border  `,
                  {
                    "bg-opacity-70 block md:hidden ": isSidebarOpen,
                  }
                )}
                onClick={() => toggleSidebar()}
              ></div>
              {/* User Navbar */}

              <VendorNavbar />

              {/* Main Content */}
              <div
                className={cn(
                  `flex-grow flex-1 ${
                    isSidebarOpen ? "min-w-max sm:min-w-full " : ""
                  } }`
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>{children}</div>
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
