import React from "react";

interface FooterListProps {
  children: React.ReactNode;
}
export const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="w-full sm:1/2 md:1/4 lg:1/6 flex flex-col gap-2 text-black">
      {children}
    </div>
  );
};
