"use client";
import React from "react";
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

interface LoginProps {
  onClose: () => any;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [showResetPassword, setShowResetPassword] = React.useState(false);
  const handleResetPasswordOpen = () => {
    setShowResetPassword(true);
  };
  const handleResetPasswordClose = () => {
    setShowResetPassword(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
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
            <Button className="bg-green-500 text-white font-semibold w-full">
              Sign Up
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
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
