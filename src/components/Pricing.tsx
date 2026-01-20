"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Pricing() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="pricing"
      className="py-12 md:py-16 px-6 sm:px-12 lg:px-24 max-w-8xl mx-auto"
    >
      <motion.div
        className="space-y-16 md:space-y-24"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight"
        >
          Create Your Perfect <span className="text-blue-500">Experience</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left text */}
          <motion.div
            variants={fadeLeft}
            className="max-w-2xl text-center lg:text-left space-y-4 mx-auto lg:mx-0"
          >
            <h3 className="text-xl sm:text-4xl md:text-[40px] font-bold leading-tight">
              Choose whatever works best for you
            </h3>

            <p className="text-base  sm:text-lg leading-7 sm:leading-8 text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit for official consequat enim to main purpose. If
              you haven't tried out Flaro App for them help.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <motion.div
            variants={container}
            className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch"
          >
            {/* Free */}
            <motion.div
              variants={fadeUp}
              className="max-w-sm w-full border border-gray-300 text-center rounded-3xl flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <div className="border-b border-gray-300 p-8 space-y-3">
                <h4 className="text-2xl font-bold">Free Events</h4>
                <p className="text-gray-600 leading-relaxed">
                  Everything you need to start hosting and joining experiences
                  today
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  Free
                  <span className="text-base font-normal text-gray-500">
                    /no charges
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-4 px-8 pt-8 flex-1">
                <p className="text-gray-700">No hidden fees or setup costs</p>
                <p className="text-gray-700">
                  Book and join free events instantly
                </p>
                <p className="text-gray-700">
                  Create and share events at no cost
                </p>
              </div>

              <div className="p-8">
                <a
                  href={import.meta.env.VITE_DRIFTO_WEBAPP_URL}
                  target="_blank"
                  className="bg-blue-600 text-white px-6 py-4 font-semibold text-lg rounded-xl w-full block hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                </a>
              </div>
            </motion.div>

            {/* Paid */}
            <motion.div
              variants={fadeUp}
              className="max-w-sm w-full border border-gray-300 text-center rounded-3xl flex flex-col hover:shadow-xl transition-shadow duration-300 bg-blue-600 text-white"
            >
              <div className="border-b border-gray-300 p-8 space-y-3">
                <h4 className="text-2xl font-bold">Paid Events</h4>
                <p className="leading-relaxed">
                  Everything in Free, plus the power to sell your experiences.
                </p>
                <p className="text-3xl font-bold">
                  4.5% + ₦100
                  <span className="text-base font-normal">/per ticket</span>
                </p>
              </div>

              <div className="flex flex-col gap-4 px-8 pt-8 flex-1">
                <p>₦100 service fee for tickets above ₦1500</p>
                {/* <p>Free sharing on Drifto & external platforms</p> */}
                <p>Sell unlimited tickets, anytime</p>
                <p>Fast ticketing with mobile device scanning</p>
              </div>

              <div className="p-8">
                <a
                  href={import.meta.env.VITE_DRIFTO_WEBAPP_URL}
                  target="_blank"
                  className="bg-white text-blue-500 px-6 py-4 font-semibold text-lg rounded-xl w-full block hover:bg-gray-100 transition-colors duration-200"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
