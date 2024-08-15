import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Layouts from "./component/layouts/Layouts";
import CartProvider from "./providers/CartProvider";
import { Toaster } from 'react-hot-toast';

interface ToastOptions {
  style: {
    borderRadius: string;
    background: string;
    color: string;
  };
}


const toastOptions: ToastOptions = {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "Created By MSp SOLUTION",
  description: "Nepal Leading Grocery Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-green-black flex flex-col min-h-screen font antialiased`}
      >
    <Toaster toastOptions={toastOptions} />
        <Layouts>
          <CartProvider>

            <main className="flex-grow w-full">{children}

            </main>
          </CartProvider>
        </Layouts>
      </body>

    </html>
  );
}
