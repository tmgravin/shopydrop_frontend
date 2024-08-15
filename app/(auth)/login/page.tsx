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
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";
import ResetPassword from "@/app/(auth)/resetpassword/page";
import axios from "axios";
import { getCookie } from "@/app/utils/token";
import toast from "react-hot-toast";
import { headers } from "next/headers";


interface LoginProps {
  onClose: () => any;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleResetPasswordOpen = () => {
    setShowResetPassword(true);
  };

  const handleResetPasswordClose = () => {
    setShowResetPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/security/login`;
    console.log(apiUrl, "API URL");
  
    try {
      const response = await axios.post(apiUrl, { email, password }, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
        withCredentials: true
      }
      );
      console.log("Login successful:", response.data);
      const { token } = response.data; // Assuming the token is returned in the 'token' field

      // Store JWT in a cookie
      document.cookie = `token=${token}; Path=/; Secure; HttpOnly; SameSite=Strict`;
      toast.success("Login successful");
      const tokena = getCookie('token');
      // Handle successful login (e.g., redirect or close dialog)
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
      // Handle error (e.g., show error message)
    }
  };
  

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] bg-white">
        <DialogHeader>
          <DialogTitle>Welcome To ShopyDrop</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 py-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              className="pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="absolute right-3 top-3 text-gray-400" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <Input type="checkbox" className="w-8 h-4" />
              <p>Remember Me</p>
            </div>
            <div className="flex gap-1 items-center">
              <p>Forgot Password?</p>
              <Link
                onClick={handleResetPasswordOpen}
                href="/resetpassword"
                className="text-green-600"
              >
                Reset It
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-4">
            <Button type="submit" className="bg-green-500 text-white font-semibold w-full">
              Sign In 
            </Button>
            <div className="flex items-center gap-4">
              <hr className="flex-grow text-black" />
              <h1 className="text-black font-semibold">OR</h1>
              <hr className="flex-grow text-black" />
            </div>
            <Button className="flex items-center gap-3 border border-black text-black w-full">
              <FaFacebook size={24} className="text-blue-600" />
              <span>Login with Facebook</span>
            </Button>
            <Button className="flex items-center gap-3 border border-black text-black w-full">
              <FaGoogle size={24} className="text-green-600" />
              <span>Login with Google</span>
            </Button>
            <div className="flex gap-2">
              <p>Don't have an account?</p>
              <Link href="/register" className="text-green-600">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
