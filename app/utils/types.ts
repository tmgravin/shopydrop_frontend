// types.ts

export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    status: 'To Pay' | 'To Ship' | 'To Receive' | 'To Review';
    items: OrderItem[];
  }
  