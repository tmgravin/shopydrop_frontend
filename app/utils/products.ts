export interface Image {
  color: string;
  colorCode: string;
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
    hashedPassword: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount: number;
  quantity: number;
  stock: number;
  sale: number;
  brand?: string;
  category?: string;
  inStock?: boolean;
  images: Image[];
  reviews?: Review[];
  highlights: string[];
  info: string[];
  visibility: string;
}

// Example of the products array
export const products: Product[] = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "iphone 14",
    description:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla sed similique ipsum illum praesentium! Voluptatem veritatis unde perferendis esse, nesciunt asperiores? Accusamus fugit, vero ut quae consequuntur natus officia quia.",
    price: 2999,
    discount: 36,
    quantity: 30,
    stock: 10,
    sale: 20,
    brand: "apple",
    category: "Phone",
    inStock: true,
    highlights: ["lorem", "lorem", "lorem"],
    info: ["Brand", "Brand", "Brand", "Brand"],
    visibility: "published",
    images: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        image: "https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg",
      },
      {
        color: "Gray",
        colorCode: "#808080",
        image: "https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Logitech MX Keys Advanced Wireless Illuminated Keyboard, Tactile Responsive Typing, Backlighting, Bluetooth, USB-C, Apple macOS, Microsoft Windows, Linux, iOS, Android, Metal Build (Black)",
    description:
      "PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision",
    price: 102.99,
    discount: 40,

    quantity: 30,
    stock: 0,
    sale: 20,
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    highlights: ["lorem", "lorem", "lorem"],
    info: ["Brand", "Brand", "Brand", "Brand"],
    visibility: "scheduled",

    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://m.media-amazon.com/images/I/71gOLg2-kqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "648437b38c44d52b9542e340",
    name: "Apple iPhone 13, 64GB",
    description:
      'The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day E~Shop Renewed Guarantee.\n- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.\n- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.\n- This product will have a battery that exceeds 80% capacity relative to new.\n- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.\n- Product will come with a SIM removal tool, a charger and a charging cable. Headphone and SIM card are not included.\n- This product is eligible for a replacement or refund within 90-day of receipt if it does not work as expected.\n- Refurbished phones are not guaranteed to be waterproof.',
    price: 40,
    discount: 36,

    quantity: 30,
    stock: 10,
    sale: 20,
    brand: "Apple",
    category: "Phone",
    inStock: true,
    highlights: ["lorem", "lorem", "lorem"],
    info: ["Brand", "Brand", "Brand", "Brand"],
    visibility: "published",

    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg",
      },
      {
        color: "Blue",
        colorCode: " #0000FF",
        image: "https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg",
      },
      {
        color: "Red",
        colorCode: "#FF0000",
        image:
          "https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "648437b38c44d52b9542e340",
        rating: 4,
        comment:
          "good enough. I like the camera and casing. the delivery was fast too.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
          hashedPassword: null,
          createdAt: "2023-06-26T15:40:52.558Z",
          updatedAt: "2023-06-26T15:40:52.558Z",
          role: "USER",
        },
      },
      {
        id: "6499a110efe4e4de451c7edc",
        userId: "6475af156bad4917456e6e1e",
        productId: "648437b38c44d52b9542e340",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2023-06-26T14:30:40.998Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "64a4e9e77e7299078334019f",
    name: "Logitech MX Master 2S Wireless Mouse – Use on Any Surface, Hyper-Fast Scrolling, Ergonomic Shape, Rechargeable, Control Upto 3 Apple Mac and Windows Computers, Graphite",
    description:
      "Cross computer control: Game changing capacity to navigate seamlessly on 3 computers, and copy paste text, images, and files from 1 to the other using Logitech flow\nDual connectivity: Use with upto 3 Windows or Mac computers via included Unifying receiver or Bluetooth Smart wireless technology. Gesture button- Yes",
    price: 70,
    discount: 36,

    quantity: 30,
    stock: 0,
    sale: 20,
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    highlights: ["lorem", "lorem", "lorem"],
    info: ["Brand", "Brand", "Brand", "Brand"],
    visibility: "published",

    images: [
      {
        color: "Graphite",
        colorCode: " #383838",
        image:
          "https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
    ],
    reviews: [
      {
        id: "64a65a8c58b470c6e06959f3",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4e9e77e7299078334019f",
        rating: 5,
        comment: "nice",
        createdDate: "2023-07-06T06:08:49.150Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  // {
  //   id: "64a4eb6200900d44bb50628c",
  //   name: "Logitech M720 Triathlon Multi-Device Wireless Mouse, Bluetooth, USB, PC, Mac, iPad, Android, Windows, Portable, Black",
  //   description:
  //     "MULTI-DEVICE & MULTI-OS: Seamlessly switch between 3 devices with just one mouse, compatible with Windows, Mac, iOS, and Android\nUNIVERSAL CONNECTIVITY: Use the wireless Logitech Unifying Receiver or Bluetooth Low Energy wireless technology",
  //   price: 45,
  // discount: 36,

  //   quantity: 30,
  //   stock: 10,
  //   sale: 20,
  //   brand: "logitech",
  //   category: "Accesories",
  //   inStock: true,
  // visibility: "published",

  //   images: [
  //     {
  //       color: "Black",
  //       colorCode: "#000000",
  //       image: "https://m.media-amazon.com/images/I/81-xxEp5iAL._AC_SY355_.jpg",
  //     },
  //   ],
  //   reviews: [],
  // },
];
