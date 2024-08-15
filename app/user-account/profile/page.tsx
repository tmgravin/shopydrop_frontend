"use client";
import React, { useState } from 'react';
import Layout from '../accountLayout';
import Modal from './../../component/modal/modal';

interface Props {
  email: string;
  name: string;
  phoneNumber: string;
  fullname: string;
  shippingaddress: string;
  address:string;
}

const ProfilePage: React.FC<Props> = ({ email, name, phoneNumber, fullname, shippingaddress, address }) => {
  const [userInfo, setUserInfo] = useState({
    email,
    name,
    phoneNumber,
    fullname,
    shippingaddress,
    address,
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => setActiveModal(modalType);
  const handleCloseModal = () => setActiveModal(null);

  const handleSubmit = (formData: any) => {
    setUserInfo(prevState => ({
      ...prevState,
      ...formData,
    }));
    console.log('Updated User Info:', formData);
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="w-[1200px] h-auto">
        <h1 className="text-3xl font-bold mb-8">Account settings</h1>

        {/* Account Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account information</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="block">
                <span className="block">Full Name</span>
                <span className="block">{userInfo.fullname}</span>
              </div>
              <div className="flex flex-col space-y-2 items-center">
                <button className="text-green-600 font-medium" onClick={() => handleOpenModal('fullname')}>
                  Change
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="block">
              <span className="block" >Email</span>
              <span className="block">{userInfo.email}</span>
              </div>
              <div className="flex space-x-4 items-center">
                <button className="text-green-600 font-medium" onClick={() => handleOpenModal('email')}>Change E-mail</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
              <span className="block"> Address</span>
              <span className="block">{userInfo.address}</span>
              </div>
              
              <button className="text-green-600 font-medium" onClick={() => handleOpenModal('address')}>Change Address</button>
            </div>
            <div className="flex justify-between items-center">
              <div className="block"> 
              <span className="block">Shipping Address</span>
               <span className="block">{userInfo.shippingaddress}</span>
              </div>
              <div className="flex space-x-4 items-center">
               
                <button className="text-green-600 font-medium" onClick={() => handleOpenModal('shippingaddress')}>Change Shipping Address</button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="block">
              <span className="block">Phone number</span>
              <span className="block">{userInfo.phoneNumber}</span>
                </div>
              <div className="flex space-x-4 items-center">
              
                <button className="text-green-600 font-medium" onClick={() => handleOpenModal('phoneNumber')}>Change Phone Number</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={activeModal === 'email'}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Edit Email Address"
          formData={{ email: userInfo.email }}
        />
        <Modal
          isOpen={activeModal === 'fullname'}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Edit Full Name"
          formData={{ fullname: userInfo.fullname }}
        />
        <Modal 
        isOpen={activeModal==='address'}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title="Change Address"
        formData={{address:userInfo.address}}
        />
       
        <Modal
          isOpen={activeModal === 'shippingaddress'}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Change Shipping Address"
          formData={{ shippingaddress: userInfo.shippingaddress }}
        />
        <Modal
          isOpen={activeModal === 'phoneNumber'}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Change Phone Number"
          formData={{ phoneNumber: userInfo.phoneNumber }}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
