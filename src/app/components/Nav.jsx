"use client";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import logo from "../../../public/asesst/logo.png";
import Image from "next/image";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data, status } = useSession();

  // লোডিং চেক করতে হলে 'loading' status চেক করুন
  if (status === "loading") {
    return (
      <nav className="bg-gray-800 text-white sticky top-0 z-999">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                priority
                className="h-[80px] w-[70px] mx-auto md:mx-0 text-white"
              />
            </div>
            <div className="text-white">Loading...</div>{" "}
            {/* এখানে লোডিং টেক্সট বা সিম্পল স্পিনার দেখাতে পারেন */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-999">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              priority
              className="h-[80px] w-[70px] mx-auto md:mx-0 text-white"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
            {status === "authenticated" && (
              <Link
                href="/service"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Service
              </Link>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Login
              </Link>
            )}
            {status === "unauthenticated" && (
              <Link
                href="/signup"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Signup
              </Link>
            )}
            <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded">
              About Us
            </Link>
            {status === "authenticated" && data?.user?.role === "user" && (
              <Link
                href="/dashbord"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Dashbord
              </Link>
            )}
            {data?.user?.role === "admin" && (
              <Link
                href="/admindashbord"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Admin Dashbord
              </Link>
            )}
            {status === "authenticated" && (
              <button
                className="hover:bg-gray-700 px-3 py-2 rounded"
                onClick={() => signOut()}
              >
                Log Out
              </button>
            )}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-900 text-sm px-4 py-2 rounded-l focus:outline-none focus:ring"
            />
            <button className="bg-teal-500 px-4 py-2 rounded-r hover:bg-teal-600">
              Search
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
            Home
          </Link>
          {status === "authenticated" && (
            <Link
              href="/service"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Service
            </Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded">
              Login
            </Link>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/singup"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Singup
            </Link>
          )}
          {data?.user?.role !== "admin" && (
            <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded">
              About Us
            </Link>
          )}
          {status === "authenticated" && data?.user?.role === "user" && (
            <Link href="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
              Dashbord
            </Link>
          )}
          {data?.user?.role === "admin" && (
            <Link
              href="/admindashbord"
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              Admin Dashbord
            </Link>
          )}
          {status === "authenticated" && (
            <button className="hover:bg-gray-700 px-3 py-2 rounded">
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
