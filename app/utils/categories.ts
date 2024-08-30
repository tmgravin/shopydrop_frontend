export interface Category {
  id: string;
  category: string;
  photo: string;
  quantity: number;
  sale: number;
  date: Date;
}

export const categories: Category[] = [
  {
    id: "1",
    category: "Fruits",
    photo: "/apple.jpg",
    quantity: 30,
    sale: 30,
    date: new Date("2024-08-01"),
  },
  {
    id: "2",
    category: "Fruits",
    photo: "/apple.jpg",
    quantity: 30,
    sale: 30,
    date: new Date("2024-08-01"),
  },
  {
    id: "3",
    category: "Fruits",
    photo: "/apple.jpg",
    quantity: 30,
    sale: 30,
    date: new Date("2024-08-01"),
  },
  {
    id: "4",
    category: "Fruits",
    photo: "/apple.jpg",
    quantity: 30,
    sale: 30,
    date: new Date("2024-08-01"),
  },
];
