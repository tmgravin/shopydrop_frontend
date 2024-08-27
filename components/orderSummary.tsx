import React from 'react';
import { Card } from '@/components/ui/card'; // Importing shadcn card component

const OrderSummary = () => {
  return (
    <Card className="p-4">
      <p>Item 1: $10</p>
      <p>Item 2: $20</p>
      <p className="font-bold">Total: $30</p>
    </Card>
  );
};

export default OrderSummary;
