"use client";

import { useState } from 'react';
import PaymentOptions from '@/components/paymentOptions';
import AddressForm from '@/components/AddressForm';
import PriceCard from '../cart/PriceCard';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CheckoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handlePaymentClick = (method: string) => {
    setSelectedPaymentMethod(method);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPaymentMethod(null);
  };

  return (
    <div className="container mx-auto p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">Checkout</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Column */}
        <div className="flex-1">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Delivery Address</h2>
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
              <AddressForm />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Options</h2>
            <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
              <PaymentOptions 
                onOnlinePaymentClick={() => handlePaymentClick('Online Payment')}
                onPartialPaymentClick={() => handlePaymentClick('Partial Payment')}
              />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3">
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <PriceCard />
          </div>
        </div>
      </div>

      {/* Modal for Payment QR Code */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogTitle>{selectedPaymentMethod}</DialogTitle>
          <div className="flex flex-col items-center">
            <p className="mb-4">Scan the QR code to complete the payment</p>
            <Image
              src="https://blog.esewa.com.np/wp-content/uploads/2019/09/QR-blog-02.png" // Replace with your QR code image path
              alt="Payment QR Code"
              width={200}
              height={200}
              className="mb-4"
            />
            <Button onClick={closeModal}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
