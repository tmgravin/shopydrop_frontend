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
import { FaEnvelope } from "react-icons/fa";

interface ResetPasswordProps {
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onClose }) => {
  return (
    <div>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[520px] bg-white">
          <div className="flex flex-col gap-y-8 py-4">
            <DialogHeader>
              <DialogTitle className=" mb-2">Forgot Password</DialogTitle>
              <div className="mt-2 mb-20">
                enter the email address associated with your account and we will
                send a link to reset your password
              </div>
            </DialogHeader>
            <div className="relative mt-10">
              <Input type="email" placeholder="Email" className="pr-10" />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <Button className="bg-green-500 text-white font-semibold w-full">
                Reset Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetPassword;
