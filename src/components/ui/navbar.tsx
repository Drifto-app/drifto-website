import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BiMenu} from "react-icons/bi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleGetStarted = () => {
    // window.location.href = "https://app.drifto.app";

    window.open(import.meta.env.VITE_DRIFTO_WEBAPP_URL, "_blank");
  };

  return (
    <nav className="w-screen z-50 fixed top-0 bg-white pl-5 md:p-20 pr-5 py-4 md:py-4">
      <div
        className="flex items-center justify-between"
      >
        {/* Logo */}
        <img
          src="/assets/icons/drifto_logo1.svg"
          alt="Drifto"
          className="h-6 md:h-8"
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
          <a href={import.meta.env.VITE_DRIFTO_APPSTORE_URL} target="_blank" className="flex items-center justify-center rounded-full border-1 border-neutral-500 p-2">
            <img
              src="/assets/icons/apple_icon.svg"
              className="h-5 w-5 cursor-pointer"
            />
          </a>

          <a href={import.meta.env.VITE_DRIFTO_PLAYSTORE_URL} target="_blank" className="flex items-center justify-center rounded-full border-1 border-neutral-500 p-2">
            <img
              src="/assets/icons/google_playstore.svg"
              className="h-5 w-5 cursor-pointer"
            />
          </a>

          <button
              className="rounded-lg bg-blue-500 px-5 py-2 text-white text-sm cursor-pointer"
              onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <BiMenu size={30} />
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
            <a
              href={import.meta.env.VITE_DRIFTO_PLAYSTORE_URL}
              target="_blank"
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
            </a>

            <a
              href={import.meta.env.VITE_DRIFTO_APPSTORE_URL}
              target="_blank"
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
            </a>
          </div>

          <button className="mt-2 rounded-lg bg-blue-500 font-bold text-2xl py-3 text-white">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
