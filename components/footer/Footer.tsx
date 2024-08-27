import React from "react";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { Container } from './../../app/component/Container';
import { FooterList } from './FooterList';
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-slate-200 text-sm mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row pt-16 pb-5 space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col md:w-1/2">
            <h1 className="font-bold text-3xl mb-4">Logo</h1>
            <p className="text-justify mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              quo nostrum, hic magnam, ducimus numquam necessitatibus provident
              itaque vitae,
            </p>
            <div className="flex gap-2 mb-6">
              <Image
                className="w-20 h-10 rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
                alt="payment Method"
                width={100}
                height={100}
              />
              <Image
                className="w-20 h-10 rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwWa20Ba7lNTbbVITqfiPY_662rA1zN2cSA&ss"
                alt="payment Method"
                width={100}
                height={100}
              />
            </div>
            <div className="flex gap-2">
              <Image
                className="w-20 h-10 rounded-md"
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp"
                alt="payment Method"
                width={100}
                height={100}
              />
              <Image
                className="w-20 h-10 rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwWa20Ba7lNTbbVITqfiPY_662rA1zN2cSA&ss"
                alt="payment Method"
                width={100}
                height={100}
              />
            </div>
          </div>

          <div className="flex flex-col md:w-1/2 md:flex-row md:space-x-8">
            <FooterList className="flex-1">
              <h3 className="font-bold">Category</h3>
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

            <FooterList className="flex-1">
              <h3 className="font-bold">Company</h3>
              <Link href="/about">About Us</Link>
              <Link href="#">Contact Us</Link>
              <Link href="#">Our Team</Link>
            </FooterList>

            <FooterList className="flex-1">
              <h3 className="font-bold">Help</h3>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms & Services</Link>
              <Link href="#">Return Policy</Link>
              <Link href="#">FAQ</Link>
            </FooterList>

            <FooterList className="flex-1">
              <h3 className="font-bold">Contact Us</h3>
              <div className="flex gap-3 mb-4">
                <p><IoLocationOutline size={24} /></p>
                <p>Anamnagar, Kathmandu, 44600</p>
              </div>
              <div className="flex gap-2 mb-4">
                <FaPhone size={24} />
                <p>+977-9848516176</p>
              </div>
              <div className="flex gap-2 mb-4">
                <p><MdEmail size={24} /></p>
                <p>Support@shopydrop.com.np</p>
              </div>
              <h1 className="font-bold text-xl mb-4 text-center">Download App</h1>
              <div className="flex gap-2">
                <Image
                  className="w-36 h-14 rounded-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1O0YbQB5CXb8jd8-OCKvZCcJIghiTChxKA&s"
                  alt="App Download"
                  width={100}
                  height={100}
                />
                <Image
                  className="w-36 h-14 rounded-md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1O0YbQB5CXb8jd8-OCKvZCcJIghiTChxKA&s"
                  alt="App Download"
                  width={100}
                  height={100}
                />
              </div>
            </FooterList>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t pt-4 mt-4">
          <p>&copy; Fresho 2024. All Rights Reserved</p>
          <div className="flex gap-3 items-center">
            <p>Follow Us</p>
            <p><FaFacebook size={30} /></p>
            <p><FaInstagramSquare size={30} /></p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
