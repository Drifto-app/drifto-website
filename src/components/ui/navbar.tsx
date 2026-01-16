import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-screen z-50  fixed top-0 bg-white px-6 py-4">
      <div
        className=" flex 
      
       items-center justify-between"
      >
        {/* Logo */}
        <img
          src="/assets/icons/drifto_logo.svg"
          alt="Drifto"
          className="h-20"
        />

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link className="font-medium text-gray-700 hover:text-black" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-gray-700 hover:text-black"
              to="/pricing"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              className="font-medium text-gray-700 hover:text-black"
              to="/faq"
            >
              F.A.Q
            </Link>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center justify-center rounded-full border-1 border-black p-2">
            <img
              src="/assets/icons/apple_icon.svg"
              className="h-5 w-5 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center rounded-full border-1 border-black p-2">
            <img
              src="/assets/icons/google_playstore.svg"
              className="h-5 w-5 cursor-pointer"
            />
          </div>

          <button className="rounded-lg bg-black px-5 py-2 text-white">
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1 md:hidden"
        >
          <span className="h-0.5 w-6 bg-black"></span>
          <span className="h-0.5 w-6 bg-black"></span>
          <span className="h-0.5 w-6 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md md:hidden">
          <Link
            onClick={() => setOpen(false)}
            to="/"
            className="text-lg font-medium"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/pricing"
            className="text-lg font-medium"
          >
            Pricing
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/faq"
            className="text-lg font-medium"
          >
            F.A.Q
          </Link>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Link
              to=""
              className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white transition hover:bg-gray-800"
            >
              <img
                src="/assets/icons/google_playstore.svg"
                className="h-8 w-8"
                alt="Google Play"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Get it on</span>
                <span className="text-lg font-semibold">Google Play</span>
              </div>
            </Link>

            <Link
              to=""
              className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white transition hover:bg-gray-800"
            >
              <img
                src="/assets/icons/apple_logo_white.png"
                className="w-6"
                alt="App Store"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Download on the</span>
                <span className="text-lg font-semibold">App Store</span>
              </div>
            </Link>
          </div>

          <button className="mt-2 rounded-lg bg-blue-500 font-bold text-2xl py-3 text-white">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
