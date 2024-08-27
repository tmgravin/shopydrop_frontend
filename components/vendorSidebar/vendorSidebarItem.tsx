// src/components/Sidebar/SidebarItem.tsx
import React from 'react';

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const VendorSidebarItem: React.FC<SidebarItemProps> = ({ label, icon, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 py-3 w-full text-left rounded-md transition-colors ${
      isSelected ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }`}
  >
    {icon}
    <span className="text-md">{label}</span>
  </button>
);

export default VendorSidebarItem;
