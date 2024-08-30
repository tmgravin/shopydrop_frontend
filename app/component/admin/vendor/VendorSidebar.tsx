"use client";
import { useSidebar } from "@/components/SidebarProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerNoChevron,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { GoDatabase } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { MdChatBubbleOutline } from "react-icons/md";
import {
  RiCoupon2Line,
  RiLogoutBoxLine,
  RiMenuFold3Line,
} from "react-icons/ri";
import { TfiDashboard } from "react-icons/tfi";

const VendorSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const fullName = "Ritin Neupane";
  const nameParts = fullName.split(" ");
  const pic = "/user.png";
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const linkClass = (path: string) =>
    pathname.startsWith(path)
      ? "text-secondary bg-primary -mx-4 px-4 rounded-md"
      : "  bg-transparent hover:bg-primary/30 -mx-4 px-4 rounded-md";

  const subPageLinkClass = (path: string) =>
    pathname === path
      ? "bg-primary/30 text-primary -mx-8 pl-10 py-1 "
      : "bg-transparent -mx-8 pl-10 py-1 hover:bg-primary/20 ";

  useEffect(() => {
    if (pathname.startsWith("/admin/vendor/product")) {
      setOpenDropdown("product");
    }
  }, [pathname]);

  return (
    <div
      className={` px-4 h-full bg-white dark:bg-black  z-50  fixed  duration-300  shrink-0 top-0 left-0 overflow-x-hidden  overflow-y-auto ease-in-out scrollbar-hide ${
        isSidebarOpen ? "ml-0 w-full min-[400px]:w-80" : "-ml-80 w-80"
      }`}
    >
      <div className=" flex flex-col overflow-y-auto py-[14px] ">
        <div
          className={cn(
            buttonVariants({ variant: "shimmer" }),
            "flex rounded-md items-center justify-between py-6"
          )}
        >
          <div className={cn("flex items-center gap-3 py-3 px-3")}>
            <div className="relative h-8 w-8">
              <Image src={"/logo.svg"} alt="Logo" fill />
            </div>
            <h1 className="text-2xl font-bold text-white">ShofyDrop</h1>
          </div>
          <Button
            onClick={toggleSidebar}
            className="bg-transparent hover:bg-transparent rounded-none"
          >
            <RiMenuFold3Line className="text-2xl text-white" />
          </Button>
        </div>
        <div className="flex flex-col gap-5 py-3 border-b borderColor ">
          <div className="h-40 w-full rounded-md bg-muted flex justify-center items-center">
            <h1>Banner or Chart</h1>
          </div>
        </div>
      </div>

      {/* <ul className="px-4"> */}
      <Accordion type="single" collapsible className="px-4">
        <AccordionItem value="dashboard">
          <Link
            href={"/admin/vendor/dashboard"}
            onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
          >
            <AccordionTriggerNoChevron
              className={linkClass("/admin/vendor/dashboard")}
            >
              {/* <li className="sidebarBorderColor border-b py-2"> */}
              <div className={cn("flex justify-between items-center py-2")}>
                <div className="flex items-center gap-2">
                  <TfiDashboard className="size-5" />
                  <p className="font-medium">Dashboard</p>
                </div>
              </div>
            </AccordionTriggerNoChevron>
          </Link>
        </AccordionItem>

        {/* </li> */}
        {/* <li className="sidebarBorderColor py-2 border-b"> */}
        <AccordionItem value="product">
          <AccordionTrigger className={linkClass("/admin/vendor/product")}>
            <div
              className={cn(
                "flex justify-between items-center py-2 cursor-pointer"
              )}
              onClick={() => toggleDropdown("product")}
            >
              <div className="flex items-center gap-2">
                <GoDatabase className="size-5" />
                <p className="font-medium">Product</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className=" py-4 ">
              <li>
                <Link
                  href={"/admin/vendor/product/product-list"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/product/product-list")
                    )}
                  >
                    Product List
                  </p>
                </Link>
              </li>

              <li>
                <Link
                  href={"/admin/vendor/product/add-product"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/product/add-product")
                    )}
                  >
                    Add Product
                  </p>
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* </li> */}
        {/* <li className="sidebarBorderColor py-2 border-b"> */}
        <AccordionItem value="orders">
          <AccordionTrigger className={linkClass("/admin/vendor/orders")}>
            <div
              className={cn(
                "flex justify-between items-center py-2 cursor-pointer"
              )}
              onClick={() => toggleDropdown("orders")}
            >
              <div className="flex items-center gap-2">
                <LuClipboardList className="size-5" />
                <p className="font-medium">Orders</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="py-4 ">
              <li>
                <Link
                  href={"/admin/vendor/orders/order-list"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/orders/order-list")
                    )}
                  >
                    Order List
                  </p>
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* </li> */}
        {/* <li className="sidebarBorderColor py-2 border-b"> */}
        <AccordionItem value="category">
          <AccordionTrigger className={linkClass("/admin/vendor/category")}>
            <div
              className={cn(
                "flex justify-between items-center py-2 cursor-pointer"
              )}
              onClick={() => toggleDropdown("category")}
            >
              <div className="flex items-center gap-2">
                <BiCategory className="size-5" />
                <p className="font-medium">Category</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="py-4 ">
              <li>
                <Link
                  href={"/admin/vendor/category/category-list"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/category/category-list")
                    )}
                  >
                    Category List
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/vendor/category/add-category"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/category/add-category")
                    )}
                  >
                    Add Category
                  </p>
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* </li> */}
        {/* <li className="sidebarBorderColor py-2 border-b"> */}
        <AccordionItem value="customer">
          <AccordionTrigger className={linkClass("/admin/vendor/customer")}>
            <div
              className={cn(
                "flex justify-between items-center py-2 cursor-pointer"
              )}
              onClick={() => toggleDropdown("customer")}
            >
              <div className="flex items-center gap-2">
                <FiUser className="size-5" />
                <p className="font-medium">Customer</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="py-4 ">
              <li>
                <Link
                  href={"/admin/vendor/customer/customer-list"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/customer/customer-list")
                    )}
                  >
                    Customer List
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/vendor/customer/add-customer"}
                  onClick={() =>
                    window.innerWidth < 768 ? toggleSidebar() : null
                  }
                >
                  <p
                    className={cn(
                      "font-medium",
                      subPageLinkClass("/admin/vendor/customer/add-customer")
                    )}
                  >
                    Add Customer
                  </p>
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* <li className="sidebarBorderColor py-2 border-b"> */}
        <AccordionItem
          value="uploadQR"
          className={linkClass("/admin/vendor/upload-qr")}
        >
          <Link
            href={"/admin/vendor/upload-qr"}
            onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
          >
            <AccordionTriggerNoChevron>
              <div className={cn("flex justify-between items-center py-2")}>
                <div className="flex items-center gap-2">
                  <FiUploadCloud className="size-5" />
                  <p className="font-medium">Upload QR</p>
                </div>
              </div>
              {/* </li> */}
            </AccordionTriggerNoChevron>
          </Link>
        </AccordionItem>
        <AccordionItem value="chat" className={linkClass("/admin/vendor/chat")}>
          <Link
            href={"/admin/vendor/chat"}
            onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
          >
            <AccordionTriggerNoChevron>
              {/* <li className="sidebarBorderColor py-2 border-b"> */}
              <div className={cn("flex justify-between items-center py-2")}>
                <div className="flex items-center gap-2">
                  <MdChatBubbleOutline className="size-5" />
                  <p className="font-medium">Chat</p>
                </div>
              </div>
            </AccordionTriggerNoChevron>
          </Link>
        </AccordionItem>
        {/* </li> */}
        <AccordionItem
          value="coupon"
          className={linkClass("/admin/vendor/coupon")}
        >
          <Link
            href={"/admin/vendor/coupon"}
            onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
          >
            <AccordionTriggerNoChevron>
              {/* <li className="sidebarBorderColor py-2 border-b"> */}
              <div className={cn("flex justify-between items-center py-2")}>
                <div className="flex items-center gap-2">
                  <RiCoupon2Line className="size-5" />
                  <p className="font-medium">Coupon</p>
                </div>
              </div>
              {/* </li> */}
            </AccordionTriggerNoChevron>
          </Link>
        </AccordionItem>
        <AccordionItem
          value="logout"
          className={linkClass("/admin/vendor/logout")}
        >
          <Link
            href={"/admin/vendor/logout"}
            onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
          >
            <AccordionTriggerNoChevron>
              {/* <li className="sidebarBorderColor py-2"> */}
              <div className={cn("flex justify-between items-center py-2")}>
                <div className="flex items-center gap-2">
                  <RiLogoutBoxLine className="size-5" />
                  <p className="font-medium">Logout</p>
                </div>
              </div>
              {/* </li> */}
            </AccordionTriggerNoChevron>
          </Link>
        </AccordionItem>
      </Accordion>

      {/* </ul> */}
    </div>
  );
};

export default VendorSidebar;
