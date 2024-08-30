export interface OrderTrackingStage {
  stage: string;
  date: Date | null;
  time: Date | null;
  description: string | null;
  completed: boolean;
}

export interface OrderTracking {
  id: string;
  orderId: string;
  stages: OrderTrackingStage[];
}

export const orderTracking: OrderTracking[] = [
  {
    id: "1",
    orderId: "1",
    stages: [
      {
        stage: "Prepare",
        date: new Date("2024-01-01T09:00:00"),
        time: new Date("2024-01-01T09:00:00"),
        description: "The sender is preparing the goods",
        completed: true,
      },
      {
        stage: "Pick Up",
        date: new Date("2024-08-01T11:00:00"),
        time: new Date("2024-08-01T11:00:00"),
        description: "The carrier is picking up the goods",
        completed: true,
      },
      {
        stage: "Shipped",
        date: new Date("2024-08-02T10:00:00"),
        time: new Date("2024-08-02T10:00:00"),
        description: "The order has been shipped",
        completed: true,
      },
      {
        stage: "Delivery",
        date: new Date("2024-08-04T16:00:00"),
        time: new Date("2024-08-04T16:00:00"),
        description: "Your order will be delivered to you in 2 hours",
        completed: true,
      },
      {
        stage: "Success",
        date: new Date("2024-08-04T18:00:00"),
        time: new Date("2024-08-04T18:00:00"),
        description: "The order has been delivered successfully",
        completed: true,
      },
    ],
  },
  {
    id: "2",
    orderId: "2",
    stages: [
      {
        stage: "Prepare",
        date: new Date("2024-01-01T09:00:00"),
        time: new Date("2024-01-01T09:00:00"),
        description: "The sender is preparing the goods",
        completed: true,
      },
      {
        stage: "Pick Up",
        date: new Date("2024-08-01T11:00:00"),
        time: new Date("2024-08-01T11:00:00"),
        description: "The carrier is picking up the goods",
        completed: true,
      },
      {
        stage: "Shipped",
        date: new Date("2024-08-02T10:00:00"),
        time: new Date("2024-08-02T10:00:00"),
        description: "The order has been shipped",
        completed: true,
      },
      {
        stage: "Delivery",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
      {
        stage: "Success",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
    ],
  },
  {
    id: "3",
    orderId: "3",
    stages: [
      {
        stage: "Prepare",
        date: new Date("2024-01-01T09:00:00"),
        time: new Date("2024-01-01T09:00:00"),
        description: "The sender is preparing the goods",
        completed: true,
      },
      {
        stage: "Pick Up",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
      {
        stage: "Shipped",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
      {
        stage: "Delivery",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
      {
        stage: "Success",
        date: null,
        time: null,
        description: null,
        completed: false,
      },
    ],
  },
];
