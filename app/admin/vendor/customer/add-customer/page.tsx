"use client";
import Container from "@/app/component/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebar } from "@/components/SidebarProvider";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
    addProduct: z.enum(["allow", "deny"], {
      required_error: "Add Product is required",
    }),
    updateProduct: z.enum(["allow", "deny"], {
      required_error: "Update Product is required",
    }),
    deleteProduct: z.enum(["allow", "deny"], {
      required_error: "Delete Product is required",
    }),
    applyProduct: z.enum(["allow", "deny"], {
      required_error: "Apply Product is required",
    }),
    createCoupon: z.enum(["allow", "deny"], {
      required_error: "Create Coupon is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const AddCustomer = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data submitted:", data);
    reset();
  };

  return (
    <div>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col gap-10 py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold">Add Customer</h1>
          </div>

          <div className="">
            <div className="flex items-center gap-4 font-medium">
              <Link
                href={"/admin/vendor/customer/customer-list"}
                className="hover:text-primary"
              >
                Customer
              </Link>{" "}
              <FaChevronRight /> <p className="text-gray-500">Add</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <div
                className={`${
                  isSidebarOpen
                    ? "grid-cols-1 lg:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2"
                } grid gap-5 `}
              >
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">
                    Account
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-secondary-foreground">
                    Fill in the information below to add a new account
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name" className={cn("font-medium")}>
                    Name
                  </Label>
                  <Input {...register("name")} placeholder="Name" />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                  <Label htmlFor="email" className={cn("mt-2 font-medium")}>
                    Email
                  </Label>
                  <Input {...register("email")} placeholder="Email" />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <Label htmlFor="password" className={cn("mt-2 font-medium")}>
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    placeholder="Enter Password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <Label
                    htmlFor="confirmPassword"
                    className={cn("mt-2 font-medium")}
                  >
                    Confirm Password
                  </Label>
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    type="password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs sm:text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
            <Card>
              <div
                className={`${
                  isSidebarOpen
                    ? "grid-cols-1 lg:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2"
                } grid gap-5 `}
              >
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">
                    Permission
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-secondary-foreground">
                    Items that the account is allowed to edit
                  </p>
                </div>
                <div className="grid gap-5">
                  {/* Add Product Permission */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Add Product
                    </h3>
                    <RadioGroup className="flex space-x-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allow"
                          id="addProductAllow"
                          className="size-5"
                          {...register("addProduct")}
                        />
                        <Label htmlFor="addProductAllow">Allow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="deny"
                          id="addProductDeny"
                          className="size-5"
                          {...register("addProduct")}
                        />
                        <Label htmlFor="addProductDeny">Deny</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Update Product Permission */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Update Product
                    </h3>
                    <RadioGroup className="flex space-x-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allow"
                          id="updateProductAllow"
                          className="size-5"
                          {...register("updateProduct")}
                        />
                        <Label htmlFor="updateProductAllow">Allow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="deny"
                          id="updateProductDeny"
                          className="size-5"
                          {...register("updateProduct")}
                        />
                        <Label htmlFor="updateProductDeny">Deny</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Delete Product Permission */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Delete Product
                    </h3>
                    <RadioGroup className="flex space-x-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allow"
                          id="deleteProductAllow"
                          className="size-5"
                          {...register("deleteProduct")}
                        />
                        <Label htmlFor="deleteProductAllow">Allow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="deny"
                          id="deleteProductDeny"
                          className="size-5"
                          {...register("deleteProduct")}
                        />
                        <Label htmlFor="deleteProductDeny">Deny</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Apply Product Permission */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Apply Product
                    </h3>
                    <RadioGroup className="flex space-x-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allow"
                          id="applyProductAllow"
                          className="size-5"
                          {...register("applyProduct")}
                        />
                        <Label htmlFor="applyProductAllow">Allow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="deny"
                          id="applyProductDeny"
                          className="size-5"
                          {...register("applyProduct")}
                        />
                        <Label htmlFor="applyProductDeny">Deny</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Create Coupon Permission */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Create Coupon
                    </h3>
                    <RadioGroup className="flex space-x-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="allow"
                          id="createCouponAllow"
                          className="size-5"
                          {...register("createCoupon")}
                        />
                        <Label htmlFor="createCouponAllow">Allow</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="deny"
                          id="createCouponDeny"
                          className="size-5"
                          {...register("createCoupon")}
                        />
                        <Label htmlFor="createCouponDeny">Deny</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Card>
            <Button type="submit" className="mt-10">
              Save
            </Button>{" "}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddCustomer;
