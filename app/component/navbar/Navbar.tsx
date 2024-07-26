import { IoMenu } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Container } from "./../Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Navbar = () => {
  return (
    <div className="sticky top-0 butt z-30 w-full shadow-sm bg-green-400">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between text-white gap-2 md:gap-0">
            <div className="flex justify-between items-center md:gap-10">
              <IoMenu className="w-10 h-10 md:w-16 md:h-10" />
              <div className=" items-center text-center mx-auto">
                <h1 className="font-bold text-3xl ">Logo</h1>
              </div>
            </div>
            <div className="hidden md:flex gap-24 items-center">
              <div className="hidden md:block md:w-[300px] text-black">
                Search input Here
              </div>
              <div className="lg:flex md:hidden gap-1 items-center">
                <p>
                  <AiOutlineThunderbolt className="w-[18px]  h-[20px] x" />
                </p>
                <p className=" text-white font-medium">
                  Order now and get within
                </p>
                <p className="text-red-700">20 Minutes!</p>
              </div>
              <div className="flex gap-4">
               <button className="w-[72px] h-[32px] bg-blue-700 rounded-sm">
                  Login 
                </button>
          
                <button className="w-[72px] h-[32px] bg-blue-700 rounded-sm">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
