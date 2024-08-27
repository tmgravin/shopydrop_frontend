import React from 'react';
import { Order } from '../utils/userData';
import Image from "next/image";

interface Props {
  order: Order;
}

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <div className="border p-4 rounded-lg mb-4 flex">
      <Image src={order.image} alt={order.title} className="w-24 h-24 object-cover rounded-md" />
      <div className="ml-4 flex-1">
        <h3 className="font-bold text-lg">{order.title}</h3>
        <p className={`text-sm ${order.orderPlaced ? 'text-green-600' : 'text-red-600'}`}>
          {order.orderPlaced ? 'Order Placed' : 'Order not Placed'}
        </p>
        <p className="text-sm text-gray-600">{order.paymentStatus === 'successful' ? 'Payment successful.' : 'Payment not successful. Please contact your bank for any money deducted.'}</p>
        <p className="text-sm text-gray-600">Your payment was {order.paymentStatus === 'successful' ? '' : 'not'} confirmed by the bank</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">Rs. {order.amount}</p>
      </div>
    </div>
  );
};

export default OrderItem;
