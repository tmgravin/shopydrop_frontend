import React from "react";
import Container from "../Container";
import { FooterList } from "./FooterList";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer
      className="bg-slate-200 text-sm
    "
    >
      <Container>
        <h1 className="font-bold text-3xl absolute mt-4">Logo</h1>

        <div className="flex flex-col text-black justify-between md:flex-row pt-16 pb-5">
          <FooterList>
            <p className=" text-justify mr-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              quo nostrum, hic magnam, ducimus numquam necessitatibus provident
              itaque vitae,
            </p>
            <div className="flex gap-2 mb-3">
              <img
                className="w-20 h-10 rounded-md "
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
                alt="payment Method"
              />
              <img
                className="w-20 h-10 rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwWa20Ba7lNTbbVITqfiPY_662rA1zN2cSA&ss"
                alt="payment Method"
              />
            </div>
            <div className="flex gap-2 ">
              <img
                className="w-20 h-10 rounded-md "
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
                alt="payment Method"
              />
              <img
                className="w-20 h-10 rounded-sm"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwWa20Ba7lNTbbVITqfiPY_662rA1zN2cSA&ss"
                alt="payment Method"
              />
            </div>
          </FooterList>
          <FooterList>
            <h3 className="font-bold font-base">Category</h3>
            <Link href="#">Grocery</Link>
            <Link href="#">Pharmacy</Link>
            <Link href="#">Beauty</Link>
            <Link href="#">Alcohol</Link>
            <Link href="#">Retail</Link>
            <Link href="#">Wholesale</Link>
            <Link href="#">Pets</Link>
            <Link href="#">Bakery</Link>
            <Link href="#">Meat</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold font-base"> Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Our Team</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold font-base"> Help</h3>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Services</Link>
            <Link href="#">Return Policy</Link>
            <Link href="#">FAQ</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold font-base"> Contact Us</h3>
            <div className="flex gap-3">
              <p>
                <IoLocationOutline size={24} />
              </p>
              <p>Anamnagar, Kathmandu, 44600</p>
            </div>
            <div className="flex gap-2">
              <FaPhone size={24} />
              <p>+977-9848516176</p>
            </div>
            <div className="flex gap-2">
              <p>
                <MdEmail size={24} />
              </p>
              <p>Support@shopydrop.com.np</p>
            </div>
            <h1 className="font-bold font-base text-center items-centers text-xl">
              Download App
            </h1>
            <div className="flex gap-2 ">
              <img
                className="w-36 h-14 rounded-sm "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1O0YbQB5CXb8jd8-OCKvZCcJIghiTChxKA&s"
                alt="payment Method"
              />
              <img
                className="w-36 h-14s rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1O0YbQB5CXb8jd8-OCKvZCcJIghiTChxKA&s"
                alt="payment Method"
              />
            </div>
          </FooterList>
        </div>
        <div className="w-full flex justify-between ">
          <div>
            <p>&copy; Fresho 2024. All Right Reserved</p>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <p>Follow Us</p>
            <p>
              <FaFacebook size={30} />
            </p>
            <p>
              <FaInstagramSquare size={30} />
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
