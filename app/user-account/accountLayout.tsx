"use client"
import { useEffect } from "react";
import Sidebar from "../component/sidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  useEffect(()=>  (console.log('UserAccountLayout rendered'))
  ,[])
  return (
    <div className="flex">
        <Sidebar />
      <div className="p-10 bg-white ">
        {children}
      </div>
    </div>
  );
}
