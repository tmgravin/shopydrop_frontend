import { CiHome } from "react-icons/ci";
import { SidebarButton } from "./sidebar-button";
import { SidebarItems } from "@/lib/types";

interface NavbarProps {
  sidebarItems: SidebarItems; // Corrected the property name
}

export default function SidebarNavbar({ sidebarItems }: NavbarProps) {
  return (
    <div>
      <aside
        className="w-[300px] max-w-xs h-screen left-0 top-0 z-40 border-r"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4">
          <h1 className="mx-3 text-lg font-semibold text-foreground">
            ShopyDrop
          </h1>
          <div className="mt-5">
            <div className="flex flex-col gap-1 w-full">
              {/* Iterate over Links, ensuring no undefined issues */}
              {sidebarItems.Links.map((link, index) => (
                <SidebarButton
                  key={index}
                  icon={link.icon}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
