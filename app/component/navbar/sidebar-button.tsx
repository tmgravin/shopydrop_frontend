import React from "react";
import { CiHome } from "react-icons/ci";
import { Button } from "@/components/ui/button"; // Assuming this is a styled button component
import classNames from "classnames";

interface SidebarButtonProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
  className?: string;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  href,
  className,
  ...props
}: SidebarButtonProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className={classNames("gap-2 justify-start", className)}
        {...props}
      >
        {icon || <CiHome />} {label} {/* Removed the hardcoded 'Home' */}
      </Button>
    </div>
  );
};
