// data/userData.ts
export const userData = {
    email: "ankitsaud7@gmail.com",
    name: "Ankit saud",
    phoneNumber: "No phone number",
    orders: [
      { id: 1, title: "Order 1", date: "2024-08-10" },
      { id: 2, title: "Order 2", date: "2024-08-08" },
    ],
    addresses: ["Address 1", "Address 2"],
    paymentMethods: ["Visa **** 1234", "MasterCard **** 5678"],
  };
  export interface Order {
    id: number;
    title: string;
    date: string;
    status: 'onTheWay' | 'delivered' | 'cancelled';
    amount: number;
    image: string;
    paymentStatus: 'successful' | 'unsuccessful';
    orderPlaced: boolean;
  }
  
  export const ordersData: Order[] = [
    {      id: 1,
      title: 'Wells Homestead Acres Local Apple',
      date: '2024-08-10',
      status: 'delivered',
      amount: 300,
      image: '/apple.png', // This should be in your public directory
      paymentStatus: 'successful',
      orderPlaced: true,
    },
    {
      id: 2,
      title: 'Wells Homestead Acres Local Apple',
      date: '2024-08-09',
      status: 'cancelled',
      amount: 500,
      image: '/apple.png',
      paymentStatus: 'unsuccessful',
      orderPlaced: false,
    },
  ];
  