//I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const products = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "iphone 14",
    description: "Short description",
    price: 2999,
    brand: "apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPVI2X2jdm_i5YFHY_fYjb8PO6fpZGUEKwg&s",
      },
      {
        color: "Gray",
        colorCode: "#808080",
        image: "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
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
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
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
            "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
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
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPVI2X2jdm_i5YFHY_fYjb8PO6fpZGUEKwg&s",
      },
      {
        color: "Blue",
        colorCode: " #0000FF",
        image: "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Red",
        colorCode: "#FF0000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPVI2X2jdm_i5YFHY_fYjb8PO6fpZGUEKwg&s",
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
            "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
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
    name: "Logitech MX Master 2S Wireless Mouse – Use on Any Surface, Hyper-Fast S",
    description:
      "Cross computer control: Game changing capacity to s",
    price: 70,
    brand: "logitech",
    category: "Accesories",
    inStock: true,
    images: [
      {
        color: "Graphite",
        colorCode: " #383838",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },

  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth et up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
      {
        color: "Silver",
        colorCode: "#C0C0C0",
        image:
          "https://www.merokirana.com/archive/KiranaProduct/ee99bb4531174afaa4fe738b197c03e3.jpg",
      },
    ],
    reviews: [],
  },
];
