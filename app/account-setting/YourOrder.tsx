// components/YourOrders.tsx
import React from 'react';

interface Props {
  orders: { id: number; title: string; date: string }[];
}

const YourOrders: React.FC<Props> = ({ orders }) => (
  <div>
    <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
    <ul>
      {orders.map(order => (
        <li key={order.id}>{order.title} - {order.date}</li>
    
      ))}
    </ul>
  </div>

);

export default YourOrders;
