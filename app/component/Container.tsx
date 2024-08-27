import React, { Children } from "react";
interface containerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<containerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto px-2.5 md:px-20">{children}</div>
  );
};
export default Container;
