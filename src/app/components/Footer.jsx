import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/asesst/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left ">
        {/* Logo Section */}
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            priority
            className="h-[120px] w-[100px] mx-auto md:mx-0"
          />
          <p className="mt-2 text-gray-400">
            YourWebsite - The best place for your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6 mt-2">
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} YourWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
