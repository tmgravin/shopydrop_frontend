export interface Coupon {
  id: string;
  title: string;
  code: string;
  discountType: string;
  startDate: Date;
  expiryDate: Date;
}

export const coupons: Coupon[] = [
  {
    id: "1",
    title: "test",
    code: "test123",
    discountType: "fixed",
    startDate: new Date("2010-09-08"),
    expiryDate: new Date("2025-10-10"),
  },
];
