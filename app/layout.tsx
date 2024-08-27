import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Layouts from "./component/layouts/Layouts";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/SidebarProvider";

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
        className={`${poppins.className} text-green-black flex flex-col min-h-screen font antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Layouts>
              <main className="flex-grow w-full overflow-hidden">
                {children}
              </main>
            </Layouts>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
