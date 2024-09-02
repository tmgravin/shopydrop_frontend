"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { CiMobile2 } from "react-icons/ci";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface SignupProps {
  onClose: () => void;
  isOpen: boolean;
}

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  terms: boolean; // Add terms field to the form data
}

const Register = ({ onClose, isOpen }: SignupProps) => {
  const [data, setData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    terms: false, // Initialize terms as false
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (!data.terms) {
      setErrorMessage("You must accept the terms and privacy policy.");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages

    try {
      const res = await axios.post(`${baseURL}/api/auth/signup`, data);
      console.log(res);
      // Optionally close the dialog or reset the form after successful registration
      onClose();
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed. Please try again."); // Set error message
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] bg-white">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-y-8 py-4">
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <div className="relative">
            <Input
              type="text"
              name="name"
              placeholder="Username"
              className="pr-10"
              value={data.name}
              onChange={handleChange}
              required
            />
            <FaUser className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Address"
              name="address"
              className="pr-10"
              value={data.address}
              onChange={handleChange}
              required
            />
            <IoLocationSharp className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="tel" // Change to tel for better UX on mobile
              name="phone"
              placeholder="Phone Number"
              className="pr-10"
              value={data.phone}
              onChange={handleChange}
              required
            />
            <CiMobile2 className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              className="pr-10"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="pr-10"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <FaLock className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-1 items-center">
            <Input
              type="checkbox"
              className="w-8 h-4"
              name="terms"
              checked={data.terms}
              onChange={handleChange}
              required
            />
            <p>I have read and accept the</p>
            <Link href="/terms" className="text-green-600">
              Terms and Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col items-center text-center gap-y-4">
            <Button
              type="submit"
              className="bg-green-500 text-white font-semibold w-full"
            >
              Register
            </Button>
            <div className="flex gap-2">
              <p>Already have an account?</p>
              <Link href="/login" className="text-green-600">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
