"use client";
import { useState } from 'react';
import AccountLayout from '../accountLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState<string>('all');

  // Static order data
  const orders = [
    {
      id: '12345',
      status: 'To Pay',
      items: [
        {
          name: 'Wireless Mouse',
          price: 20.99,
          quantity: 1,
          imageUrl: 'https://www.merokirana.com/archive/KiranaProduct/81bsNnbi2gL._SL1500_bd844e2f-54c8-4ac4-8ca1-338289ceb639.jpg', // Replace with a Google image URL
        },
        {
          name: 'Keyboard',
          price: 45.0,
          quantity: 1,
          imageUrl: 'https://www.merokirana.com/archive/KiranaProduct/a_0._2b0200e6-309a-4ec5-b95f-79a5a999fee1.jpg', // Replace with a Google image URL
        },
      ],
    },
    {
      id: '67890',
      status: 'To Ship',
      items: [
        {
          name: 'Laptop',
          price: 999.99,
          quantity: 1,
          imageUrl: 'https://www.merokirana.com/archive/KiranaProduct/98ae872e3cc24707895cb88123c3ead9.jpeg', // Replace with a Google image URL
        },
      ],
    },
    {
      id: '11223',
      status: 'To Review',
      items: [
        {
          name: 'USB-C Hub',
          price: 25.0,
          quantity: 2,
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0x4nRHmYEJtr7boLfWdjhSKDpbhp4k6VQA&s', // Replace with a Google image URL
        },
      ],
    },
  ];

  // Function to filter orders based on selected tab
  const filteredOrders = selectedTab === 'all'
    ? orders
    : orders.filter(order => 
        order.status.toLowerCase().replace(/\s/g, '-') === selectedTab
      );

  return (
    <AccountLayout>
      <div className="mx-12"> 
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        {/* Full-width TabsList with equally spaced tabs */}
        <TabsList className="border-b mb-4 w-[1000px] flex justify-between">
          <TabsTrigger value="all" className="w-full text-center">All ordered</TabsTrigger>
          <TabsTrigger value="to-pay" className="w-full text-center">Approved</TabsTrigger>
          <TabsTrigger value="to-ship" className="w-full text-center">Pending</TabsTrigger>
          <TabsTrigger value="to-receive" className="w-full text-center">Delevered</TabsTrigger>
          <TabsTrigger value="to-review" className="w-full text-center">To Review</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4 w-full">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-md shadow-sm">
                  <h2 className="text-lg font-medium">Order ID: {order.id}</h2>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <ul className="mt-2 space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="mr-2 w-16 h-16 rounded"
                        />
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="items-center text-center mt-16 mx-auto">No orders available.</p>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </AccountLayout>
  );
}
