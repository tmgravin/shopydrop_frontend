import React from "react";
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
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] bg-white">
          <DialogHeader>
            <DialogTitle>Welcome To ShopyDrop</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-8 py-4">
            <div className="relative">
              <Input type="email" placeholder="Email" className="pr-10" />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <Input type="password" placeholder="Password" className="pr-10" />
              <FaLock className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center text-center">
                <Input type="checkbox" className="w-8 h-4" />
                <p>Remember Me</p>
              </div>
              <div className="flex gap-1 items-center text-center">
                <p>Forgot Password?</p>
                <Link href="/terms" className="text-green-600">
                  Reset It
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-y-4">
              <Button className="bg-green-500 text-white font-semibold w-full">
                Sign Up
              </Button>
              <div className="flex gap-4 items-end text-center">
                <hr className="w-52 text-black" />
                <h1 className="text-black text-center mt-2 font-semibold">
                  OR
                </h1>
                <hr className="w-52 text-black" />
              </div>
              <Button className="flex  items-center text-center gap-3  border border-black text-black  w-full">
                <FaFacebook size={24} className="text-blue-600" />
                <span>Login with Facebook</span>
              </Button>
              <Button className="flex items-center text-center gap-3 border border-black text-black w-full">
                <FaGoogle size={24} className="text-green-600 " />
                <span>Login with Google</span>
              </Button>
              <div className="flex gap-2">
                <p>Don't have an account?</p>
                <Link href="/register" className="text-green-600">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
