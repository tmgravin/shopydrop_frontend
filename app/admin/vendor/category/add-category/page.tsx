"use client";
import Container from "@/app/component/Container";
import { useSidebar } from "@/components/SidebarProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Apple, AppleIcon, BananaIcon } from "lucide-react";
import React from "react";
import { FiPackage } from "react-icons/fi";
import {
  GiFlowerPot,
  GiNoodles,
  GiPineapple,
  GiWrappedSweet,
} from "react-icons/gi";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { TbMeat } from "react-icons/tb";

const AddCategory = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const addCategory = async () => {
    try {
      const response = await axios.post(
        `https://`,
        {
          name: "name",
          icon: "icon",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error Add Category", err);
    }
  };

  return (
    <div>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col py-10 gap-10">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Add New Category
          </h1>
          <Card className="flex flex-col gap-16 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Label className=" w-full sm:w-7/12 text-base sm:text-lg font-semibold">
                Product Name
              </Label>
              <Input placeholder="Category Name" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Label className=" w-full sm:w-7/12   text-base sm:text-lg font-semibold">
                Select Category Icon
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category Icons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Icons</SelectLabel>
                    <div className="grid grid-cols-12">
                      <SelectItem value="apple">
                        <AppleIcon className="text-xl sm:text-2xl" />
                      </SelectItem>
                      <SelectItem value="beverage">
                        <MdEmojiFoodBeverage className="text-2xl" />
                      </SelectItem>
                      <SelectItem value="flowerPot" className="text-2xl">
                        <GiFlowerPot className="text-xl sm:text-2xl" />
                      </SelectItem>
                      <SelectItem
                        value="package"
                        className="text-xl sm:text-2xl"
                      >
                        <FiPackage className="text-xl sm:text-2xl" />
                      </SelectItem>

                      <SelectItem
                        value="noodles"
                        className="text-xl sm:text-2xl"
                      >
                        <GiNoodles className="text-xl sm:text-2xl" />
                      </SelectItem>
                      <SelectItem value="meat" className="text-xl sm:text-2xl">
                        <TbMeat className="text-xl sm:text-2xl" />
                      </SelectItem>
                      <SelectItem value="sweet" className="text-xl sm:text-2xl">
                        <GiWrappedSweet className="text-xl sm:text-2xl" />
                      </SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button className={""}>Save</Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AddCategory;
