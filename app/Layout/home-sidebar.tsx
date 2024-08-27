"use client";
import Link from 'next/link';
import { FaBoxOpen, FaCog, FaListUl, FaSave, FaQuestionCircle, FaGift, FaCreditCard, FaUserFriends, FaApple, FaGooglePlay } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import Avatar from './../product/[productid]/Avatar';

interface HomeSidebarProps {
  onClose: () => void;
  isOpen: boolean;
}
const HomeSidebar: React.FC<HomeSidebarProps> = ({ onClose, isOpen }) => {
  return (
    
    <div className="p-6 w-full h-full bg-white shadow-lg rounded-lg overflow-y-auto sidebar-scrollbar text-gray-800">
      {/* User Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex shrink-0 items-center gap-3 overflow-hidden">
          <span className="w-14 h-14 rounded-full border-2 justify-center items-center text-center border-gray-300 object-cover"> <Avatar /> </span>
          <div>
            <h2 className="text-2xl font-bold">ShofyDrop</h2>
            <p className="text-sm text-green-600">Customer since 2024</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-gray-200 p-2 rounded-full">
          <MdClose className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Vendor Button */}
      <div className="mb-6">
        <Link href="/vendor-form" onClick={onClose}>
          <Button variant="default" className="w-full text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg py-2">
            Become a Vendor
          </Button>
        </Link>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg mb-8 shadow-sm">
        <h3 className="font-bold text-lg">Grow Your Bussiness Through ShopyDrop</h3>
        <p className="text-sm mb-4">You can cancel at any time.</p>
        <Button variant="default" className="w-full bg-white text-purple-700 hover:bg-gray-200 rounded-lg py-2">
          Try ShofyDrop for free
        </Button>
      </div>

      {/* Account Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Account</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaBoxOpen className="w-5 h-5" />
            <span>Orders</span>
          </li>
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaCog className="w-5 h-5" />
            <Link href="/user-account/profile" onClick={onClose}>
              <span>Account Setting</span>
            </Link>
          </li>
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaListUl className="w-5 h-5" />
            <span>List</span>
          </li>
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaSave className="w-5 h-5" />
            <span>Saved</span>
          </li>
        </ul>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Credits and Promos Section */}
     

      {/* Support Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Support</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaQuestionCircle className="w-5 h-5" />
            <span>Help Center</span>
          </li>
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaQuestionCircle className="w-5 h-5" />
            <span>Work On ShopyDrop</span>
          </li>
        </ul>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* App Store Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Our Apps</h3>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaApple className="w-5 h-5" />
            <span>App Store</span>
          </li>
          <li className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition">
            <FaGooglePlay className="w-5 h-5" />
            <span>Google Play</span>
          </li>
        </ul>
      </div>

      <hr className="my-4 border-gray-300" />
    </div>
  );
};

export default HomeSidebar;
