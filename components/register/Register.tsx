
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { CiMobile2 } from "react-icons/ci";
import axios from "axios";

interface SignupProps {
  onClose: () => void;
}

interface FormData {
  username: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const Register = ({}: SignupProps) => {
  const [data, setData] = useState<FormData>({
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://192.168.1.71:8080/api/users/", data);
      console.log(res);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={}>
      <DialogContent className="sm:max-w-[520px] bg-white">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-y-8 py-4">
          <div className="relative">
            <Input
              type="text"
              name="Name"
              placeholder="name"
              className="pr-10"
              value={data.username}
              onChange={handleChange}
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
            />
            <IoLocationSharp className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="number"
              name="phone"
              placeholder="Phone Number"
              className="pr-10"
              value={data.phone}
              onChange={handleChange}
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
            />
            <FaLock className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-1 items-center">
            <Input type="checkbox" className="w-8 h-4" name="terms" required />
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
