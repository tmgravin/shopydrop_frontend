export interface Transaction {
  orderId: string;
  paymentType: string;
  date: Date;
  amount: number;
}

export const transactions: Transaction[] = [
  {
    orderId: "1",
    paymentType: "online",
    date: new Date("2024-08-08"),
    amount: 1500,
  },
  {
    orderId: "2",
    paymentType: "Cash on Delivery",
    date: new Date("2024-08-08"),
    amount: 1500,
  },
  {
    orderId: "3",
    paymentType: "online",
    date: new Date("2024-08-01"),
    amount: 1500,
  },
  {
    orderId: "4",
    paymentType: "online",
    date: new Date("2024-08-08"),
    amount: 1500,
  },
];
