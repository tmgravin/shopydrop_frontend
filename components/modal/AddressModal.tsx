"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // shadcn dialog component
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from "next/image";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full" 
          />
          <Input 
            placeholder="Phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full" 
          />
          <Input 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full" 
          />
          <Input 
            placeholder="Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            className="w-full" 
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
