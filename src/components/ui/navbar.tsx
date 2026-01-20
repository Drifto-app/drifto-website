import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleGetStarted = () => {
    window.open(import.meta.env.VITE_DRIFTO_WEBAPP_URL, "_blank");
  };

  return (
    <nav className="w-screen z-60 top-0 bg-white relative">
      <div
        className="flex items-center justify-between relative pl-5 md:p-20 pr-5 py-4 md:py-4 bg-white z-50"
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
            <a className="font-medium text-gray-700 hover:text-black" href="/#hero">
              Home
            </a>
          </li>
          <li>
            <a
              className="font-medium text-gray-700 hover:text-black"
              href="/#pricing"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              className="font-medium text-gray-700 hover:text-black"
              href="/#faq"
            >
              F.A.Q
            </a>
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

        {/* Hamburger / Close Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative z-50"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <BiX size={30} /> : <BiMenu size={30} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 bg-black/50 z-40 md:hidden`}
              onClick={() => setOpen(false)}
            />
            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full flex flex-col gap-4 bg-white p-6 shadow-lg z-50 md:hidden"
            >
              <a
                onClick={() => setOpen(false)}
                href="/#hero"
                className="text-lg font-medium"
              >
                Home
              </a>
              <a
                onClick={() => setOpen(false)}
                href="/#pricing"
                className="text-lg font-medium"
              >
                Pricing
              </a>
              <a
                onClick={() => setOpen(false)}
                href="/#faq"
                className="text-lg font-medium"
              >
                F.A.Q
              </a>

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
                    <span className="text-md font-semibold">Google Play</span>
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
                    <span className="text-md font-semibold">App Store</span>
                  </div>
                </a>
              </div>

              <button className="mt-2 rounded-lg bg-blue-500 font-bold text-sm py-3 text-white">
                Get Started
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
