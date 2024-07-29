import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Layouts from "./component/layouts/Layouts";

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
        <Layouts>
          <main className="flex-grow w-full">{children}</main>
        </Layouts>
      </body>
    </html>
  );
}
