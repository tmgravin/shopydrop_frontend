"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // shadcn dialog component
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: { name: string; phone: string; email: string; address: string; }) => void;
  initialData?: { name: string; phone: string; email: string; address: string; };
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [address, setAddress] = useState(initialData?.address || '');

  const handleSave = () => {
    onSave({ name, phone, email, address });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Address' : 'Add New Address'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Input 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md" 
          />
          <Input 
            placeholder="Phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md" 
          />
          <Input 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md" 
          />
          <Input 
            placeholder="Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md" 
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 sm:flex-none">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
