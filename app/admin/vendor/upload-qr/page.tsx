"use client";
import Container from "@/app/component/Container";
import { qr } from "@/app/utils/qr";
import { useSidebar } from "@/components/SidebarProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { TbFileUpload } from "react-icons/tb";

const VendorUploadQR = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Container className={`${isSidebarOpen ? "md:px-10 lg:px-20" : ""}`}>
        <div className="flex flex-col py-10 gap-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Upload QR</h1>
          </div>
          <div
            className={`${
              isSidebarOpen ? "grid-cols-1 xl:grid-cols-2" : "md:grid-cols-2"
            } grid  gap-[20px]`}
          >
            <Card>
              <div className="flex justify-center items-center">
                <Image src={qr.image} alt="QR Image" height={250} width={250} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center gap-5 text-center ">
                <h1 className="text-lg sm:text-xl font-semibold">
                  Upload Qr Code image
                </h1>
                <IoMdCloudUpload className="text-9xl text-primary" />
                <h2 className="text-md sm:text-lg font-semibold">
                  Supported image format: JPG, PNG, BMP
                </h2>
                <div>
                  <Button
                    className="flex gap-1 items-center max-w-60 mt-5 h-18 w-full "
                    onClick={handleButtonClick}
                  >
                    <TbFileUpload className="text-3xl sm:text-4xl" />
                    <p className="text-lg sm:text-xl">Choose File</p>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    // onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export default VendorUploadQR;
