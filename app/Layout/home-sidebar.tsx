"use client";
import Link from 'next/link';
import { FaBoxOpen, FaCog, FaListUl, FaSave, FaQuestionCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface HomeSidebarProps {
  onClose: () => void;
}

const HomeSidebar: React.FC<HomeSidebarProps> = ({ onClose }) => {
  return (
    <div className="p-4 w-[300px] bg-white h-full">
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="/path-to-profile-pic.jpg" // Update with the correct path
            alt="Profile"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h2 className="text-xl font-semibold">ShofyDrop</h2>
            <p className="text-sm text-green-600">Customer of ShofyDrop since 2024</p>
          </div>
        </div>
        <button onClick={onClose}>
          <MdClose className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* User Background Placeholder */}
      <div className='mb-4 mx-auto'>
      <Link href="/vendor-form" onClick={onClose}>
      <Button variant="default">Become a Vendor</Button>
            </Link>
       
      </div>

      <div className="bg-gray-200 h-20 rounded mb-4">
        
      </div>

      {/* Account Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Account</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <FaBoxOpen />
            <span>Orders</span>
          </li>
          <li className="flex items-center gap-2">
            <FaCog />
            <Link href="/account-setting" onClick={onClose}>
              <span>Account Setting</span>
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <FaListUl />
            <span>List</span>
          </li>
          <li className="flex items-center gap-2">
            <FaSave />
            <span>Saved</span>
          </li>
        </ul>
      </div>
     

      {/* Support Section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Support</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <FaQuestionCircle />
            <span>Help</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeSidebar;
