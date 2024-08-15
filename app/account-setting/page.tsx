// pages/account-settings.tsx
"use client";
import React, { useState } from 'react';
import { userData } from '../utils/userData';
import YourOrders from './YourOrder';
import AccountSettingsContent from './AccountSettingsContent';
// Import other components as needed
const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('accountSettings');

  const renderContent = () => {
    switch (activeSection) {
      case 'yourOrders':
        return <YourOrders orders={userData.orders} />;
      case 'accountSettings':
        return <AccountSettingsContent email={userData.email} name={userData.name} phoneNumber={userData.phoneNumber} />;
      // Add other cases as necessary
      default:
        return <AccountSettingsContent email={userData.email} name={userData.name} phoneNumber={userData.phoneNumber} />;
    }
  };

  return (
    <div className="flex">
      <div className="w-64 bg-gray-100 h-screen p-4">
        <ul className="space-y-4">
          <li
            className={`font-semibold cursor-pointer text-lg ${activeSection === 'yourOrders' ? 'text-green-600' : ''}`}
            onClick={() => setActiveSection('yourOrders')}
          >
            My orders
          </li>
          <li
            className={`font-semibold cursor-pointer text-lg ${activeSection === 'accountSettings' ? 'text-green-600' : ''}`}
            onClick={() => setActiveSection('accountSettings')}
          >
            Account settings
          </li>
          {/* Add more navigation items */}
        </ul>
      </div>

      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountSettings;