"use client";
import { useSidebar } from "@/components/SidebarProvider";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import UserNavbar from "../admin/user/UserNavbar";
import Footer from "@/components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import UserSidebar from "../admin/user/UserSidebar";
import VendorDashboardNavbar from "../admin/vendor/VendorDashboardNavbar";
import VendorDashboardSidebar from "../admin/vendor/VendorDashboardSidebar";

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

  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Navbar />}
      {pathname === "/" ? (
        <>{children}</>
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
              <VendorDashboardSidebar />
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

              <VendorDashboardNavbar />

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
      {!isAdminPath && <Footer />}
    </>
  );
};

export default Layouts;
