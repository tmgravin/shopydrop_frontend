// components/AccountSettingsContent.tsx
"use client";
import React, { useState } from 'react';// Assume this is a generalized modal component
import Modal from './Modal';

interface Props {
  email: string;
  name: string;
  phoneNumber: string;
}

const AccountSettingsContent: React.FC<Props> = ({ email, name, phoneNumber }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => setActiveModal(modalType);
  const handleCloseModal = () => setActiveModal(null);

  const handleSubmit = (formData: { email: string; name: string; phoneNumber: string }) => {
    // Handle the form data submission (e.g., API call)
    console.log('Form Data Submitted:', formData);
    handleCloseModal();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Account settings</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account information</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Email address</span>
            <div className="flex space-x-4">
              <span>{email}</span>
              <button className="text-green-600" onClick={() => handleOpenModal('changeEmail')}>Change</button>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Password</span>
            <button className="text-green-600" onClick={() => handleOpenModal('addPassword')}>Add Password</button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal information</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <span>Name</span>
            <div className="flex space-x-4">
              <span>{name}</span>
              <button className="text-green-600" onClick={() => handleOpenModal('changeName')}>Change</button>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Phone number</span>
            <div className="flex space-x-4">
              <span>{phoneNumber}</span>
              <button className="text-green-600" onClick={() => handleOpenModal('changePhoneNumber')}>Change / Verify</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'changeEmail'} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        title="Change Email"
        formData={{ email }}
      />
      <Modal 
        isOpen={activeModal === 'addPassword'} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        title="Add Password"
        formData={{ password: '' }} // Example form data
      />
      <Modal 
        isOpen={activeModal === 'changeName'} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        title="Change Name"
        formData={{ name }}
      />
      <Modal 
        isOpen={activeModal === 'changePhoneNumber'} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        title="Change / Verify Phone Number"
        formData={{ phoneNumber }}
      />
    </div>
  );
};

export default AccountSettingsContent;
