
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/utils/cookies"; // Utility function for setting cookies
import { axiosInstance } from "@/app/utils/api";

interface LoginProps {
  // onClosed: () => void;
  onClosed: never;
  isOpen:never
}

const Login : React.FC<LoginProps>= ({ onClosed,isOpen }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      axiosInstance.post('security/login', { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true
      }).then((response) => {
        console.log('response for data is',response);
        sessionStorage.setItem("token", response.data.jwtToken);
        console.log("token ", sessionStorage.getItem("token"));
        if (response.data.user.userType === "USER") {
          setCookie("token", response.data.jwtToken, { path: "/", secure: true, httpOnly: true, sameSite: "Strict" });
        } else if (response.data.user.userType === "VENDOR") {
          setCookie("token", response.data.jwtToken, { path: "/dashboard", secure: true, httpOnly: true, sameSite: "Strict" });
        } else if (response.data.user.userType === "ADMIN") {
          setCookie("token", response.data.jwtToken, { path: "/admin-dashboard", secure: true, httpOnly: true, sameSite: "Strict" });
        }
        setCookie("user", response.data.user, { path: "/", secure: true, httpOnly: true, sameSite: "Strict" });
        onClosed!();
        router.push("/");
        window.location.reload();
      })
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClosed} > 
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
              <p>Don &apos;t have an account?</p>
              <Link href="/register" className="text-green-600">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

