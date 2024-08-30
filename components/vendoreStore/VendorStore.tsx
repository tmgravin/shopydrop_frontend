import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/app/utils/products';
import { ProductCard } from '../products/productCard';
import SavedProduct from '@/app/vendorstore/savedProduct';
import VendorSidebar from '../vendorSidebar/VendorSidebar';

const VendorStore = () => {
  const [selectedContent, setSelectedContent] = useState('Shop');

  const renderContent = () => {
    switch (selectedContent) {
      case 'Shop':
        return (
          <div className="h-36">
            <Image
              src="https://img.freepik.com/free-photo/mexican-dishes-pepper_23-2147740824.jpg"
              alt=""
              width={100}
              height={100}
              className="w-full h-[308px] object-cover rounded-md shadow-lg"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 mb-6">
              {products.length > 0 ? (
                products.map((product) => <ProductCard key={product.id} data={product} />)
              ) : (
                <p className="text-center col-span-5 text-gray-500">Loading products...</p>
              )}
            </div>
          </div>
        );
      case 'Buy it again':
        return <div>Buy it again content goes here</div>;
      case 'Saved':
        return <SavedProduct />;
      case 'List':
        return <div>List content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto min-h-screen bg-gray-50">
      <VendorSidebar selectedContent={selectedContent} onContentSelect={setSelectedContent} />
      <div className="w-full lg:w-[80%] p-6 lg:pl-8 overflow-y-auto lg:h-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default VendorStore;
