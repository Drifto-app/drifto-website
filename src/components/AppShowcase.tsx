"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { mobileScreenshot, googlePlaystore, appleLogoWhite } from "@/assets";

export default function AppShowcase() {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-8 md:pt-20 md:px-16 bg-blue-500/10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">
          {/* Phone Mockup */}
          <motion.div
            variants={fadeUp}
            className="flex p-8 pb-0 md:p-0 md:w-1/2 justify-center items-end lg:justify-start"
          >
            <img
              src={mobileScreenshot}
              alt="Drifto Mobile App"
              className="w-full max-w-100 md:max-h-screen md:max-w-max drop-shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={container}
            className="flex-1 md:w-1/2 space-y-8 text-center md:text-left p-4"
          >
            <motion.h2
              variants={fadeRight}
              className="text-2xl md:text-5xl font-extrabold leading-tight"
            >
              Experience Life{" "}
              <span className="text-blue-500">Like Never Before</span>
            </motion.h2>

            <motion.p
              variants={fadeRight}
              className="text-sm md:text-xl text-gray-700 leading-relaxed"
            >
              Our intuitive mobile app puts the power of experience discovery
              and management right in your pocket. With a beautiful, modern
              interface designed for speed and simplicity.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              variants={container}
              className="space-y-4 hidden md:block"
            >
              {[
                "One-tap booking with secure payment methods",
                "Real-time notifications for updates and reminders",
                "Offline access to your tickets and experience details",
              ].map((text) => (
                <motion.li
                  key={text}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                  <span className="text-gray-800 text-lg">{text}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Store buttons */}
            <motion.div
              variants={fadeUp}
              className="flex md:flex-wrap justify-center md:justify-start gap-2 "
            >
              <a
                href={import.meta.env.VITE_DRIFTO_PLAYSTORE_URL}
                target="_blank"
                className="flex w-fit md:w-60 items-center gap-2 md:gap-4 rounded-sm bg-black p-1 px-2 md:p-2 text-white transition hover:bg-gray-800"
              >
                <img
                  src={googlePlaystore}
                  className="w-7 md:w-10"
                  alt="Google Play"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-300">Get it on</span>
                  <span className="text-lg md:text-2xl font-semibold">
                    Google Play
                  </span>
                </div>
              </a>

              <a
                href={import.meta.env.VITE_DRIFTO_APPSTORE_URL}
                target="_blank"
                className="flex w-fit md:w-60 items-center gap-2 md:gap-4 rounded-sm bg-black p-1 px-2 md:p-2 text-white transition hover:bg-gray-800"
              >
                <img
                  src={appleLogoWhite}
                  className="w-7 md:w-10"
                  alt="App Store"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-300">Download on the</span>
                  <span className="text-lg md:text-2xl font-semibold">
                    App Store
                  </span>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
