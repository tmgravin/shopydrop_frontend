"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AddressModal from './AddressModal';
import Image from "next/image";

interface Address {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const AddressForm = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);

  const handleAddNewAddress = () => {
    setIsModalOpen(true);
    setEditingAddressIndex(null);
  };

  const handleEditAddress = (index: number) => {
    setIsModalOpen(true);
    setEditingAddressIndex(index);
  };

  const handleSaveAddress = (newAddress: Address) => {
    if (editingAddressIndex !== null) {
      const updatedAddresses = addresses.map((address, index) =>
        index === editingAddressIndex ? newAddress : address
      );
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, newAddress]);
    }
  };

  return (
    <div className="space-y-4">
      {addresses.map((address, index) => (
        <div
          key={index}
          className={`p-4 border ${selectedAddressIndex === index ? 'bg-green-100' : 'bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="radio"
                checked={selectedAddressIndex === index}
                onChange={() => setSelectedAddressIndex(index)}
                className="mr-2"
              />
              <div>
                <p className="font-semibold">{address.name}</p>
                <p>{address.phone}</p>
                <p>{address.address}</p>
              </div>
            </div>
            <Button variant="link" onClick={() => handleEditAddress(index)}>Edit</Button>
          </div>
          {selectedAddressIndex === index && (
            <Button variant="default" className="mt-2">Deliver Here</Button>
          )}
        </div>
      ))}

      <Button variant="link" onClick={handleAddNewAddress} className="text-blue-600 flex items-center">
        + Add a new address
      </Button>

      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAddress}
          initialData={editingAddressIndex !== null ? addresses[editingAddressIndex] : undefined}
        />
      )}
    </div>
  );
};

export default AddressForm;
