export interface Customer {
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  totalSpent: number;
  registered: Date;
  shippingAddress: string;
  billingAddress: string;
  shippingCity: string;
  billingCity: string;
}

export const customers: Customer[] = [
  {
    id: "1",
    name: "Riya Neupane",
    image: "/user.png",
    email: "neupaneriya457@gmail.com",
    phone: "+977- 9809793086",
    totalSpent: 1000,
    registered: new Date("2024-08-06"),
    shippingAddress: "Gaushala, Jayabageshwori-8, Bagmati ",
    shippingCity: "Kathmandu, Nepal",
    billingAddress: "Gaushala, Jayabageshwori-8, Bagmati",
    billingCity: "Kathmandu, Nepal",
  },
  {
    id: "2",
    name: "Riya Neupane",
    image: "/user.png",
    email: "neupaneriya457@gmail.com",
    phone: "+977- 9809793086",
    totalSpent: 1000,
    registered: new Date("2024-08-06"),

    shippingAddress: "Gaushala, Jayabageshwori-8, Bagmati ",
    shippingCity: "Kathmandu, Nepal",
    billingAddress: "Gaushala, Jayabageshwori-8, Bagmati",
    billingCity: "Kathmandu, Nepal",
  },
];
