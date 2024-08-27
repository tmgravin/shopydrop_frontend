import React from 'react';
import Image from 'next/image';
import { SidebarItems } from '@/lib/types';
import VendorSidebarItem from './vendorSidebarItem';
import { CiBookmark, CiHome } from 'react-icons/ci';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { MdFormatListBulleted } from 'react-icons/md';

const sidebarItems: SidebarItems = {
  Links: [
    { label: "Shop", href: "/shop", icon: <CiHome size={20} /> },
    { label: "Buy it again", href: "/buy-again", icon: <PiArrowCounterClockwiseBold size={20} /> },
    { label: "Saved", href: "/saved", icon: <CiBookmark size={20} /> },
    { label: "List", href: "/list", icon: <MdFormatListBulleted size={20} /> },
  ],
};

interface SidebarProps {
  selectedContent: string;
  onContentSelect: (label: string) => void;
}

const VendorSidebar: React.FC<SidebarProps> = ({ selectedContent, onContentSelect }) => (
  <div className="overflow-y-auto lg:h-screen bg-white p-6 shadow-md rounded-md">
    <div className="mb-8 text-center">
      <Image
        src="https://www.merokirana.com/archive/KiranaProduct/823a4c95372341cfb99b25ef66f39e03.jpg"
        alt="Profile"
        width={100}
        height={100}
        className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg"
      />
      <div className="mt-4">
        <p className="text-xl font-bold text-gray-700">Wine Shop</p>
        <p className="text-sm text-gray-500">100% Customer Satisfaction</p>
      </div>
    </div>
    <div className="space-y-4">
      {sidebarItems.Links.map((item) => (
        <VendorSidebarItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isSelected={selectedContent === item.label}
          onClick={() => onContentSelect(item.label)}
        />
      ))}
    </div>
  </div>
);

export default VendorSidebar;
