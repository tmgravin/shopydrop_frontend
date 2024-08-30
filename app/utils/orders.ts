export interface Order {
  id: string;
  customer: string;
  customerId: string;
  productId: string[];
  date: Date;
  paid: string;
  total: number;
  quantity: number;
  status: string;
}

export const orders: Order[] = [
  {
    id: "1",
    customer: "Riya Neupane",
    customerId: "1",
    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-06"),
    paid: "yes",
    status: "success",
    quantity: 2,
    total: 1000,
  },
  {
    id: "2",
    customer: "Riya Neupane",
    customerId: "1",

    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-06"),
    paid: "no",
    status: "pending",
    total: 1000,
    quantity: 2,
  },
  {
    id: "3",
    customer: "Riya Neupane",
    customerId: "1",

    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-01"),
    paid: "partial",
    status: "cancel",
    total: 1000,
    quantity: 2,
  },
  {
    id: "4",
    customer: "Riya Neupane",
    customerId: "1",

    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-06"),
    paid: "yes",
    status: "success",
    total: 1000,
    quantity: 2,
  },
  {
    id: "5",
    customer: "Riya Neupane",
    customerId: "1",

    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-06"),
    paid: "no",
    status: "pending",
    total: 1000,
    quantity: 2,
  },
  {
    id: "6",
    customer: "Riya Neupane",
    customerId: "1",

    productId: [
      "64a654593e91b8e73a351e9b",
      "64a4ebe300900d44bb50628a",
      "648437b38c44d52b9542e340",
      "64a4e9e77e7299078334019f",
    ],
    date: new Date("2024-08-06"),
    paid: "partial",
    status: "cancel",
    total: 1000,
    quantity: 2,
  },
];

