import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Footer from "./component/footer/Footer";
import { Navbar } from "./component/navbar/Navbar";
import SidebarNavbar from "./component/navbar/SidebarNavbar";
import { CiHome } from "react-icons/ci"; // Import your icon
import { SidebarItems } from "./../lib/types";

const poppins = Poppins({ subsets: ["latin"], weight: ["200", "700"] });

export const metadata: Metadata = {
  title: "Created By MSp SOLUTION",
  description: "Nepal Leading Grocery Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="en">
      <body
        className={`${poppins.className} text-green-black flex flex-col min-h-screen`}
      >
        <Navbar />
        {/* Pass sidebarItems to SidebarNavbar */}
        <aside>
          <SidebarNavbar sidebarItems={sidebarItems} />
        </aside>

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
