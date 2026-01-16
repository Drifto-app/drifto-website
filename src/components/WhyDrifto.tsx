"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const WhyDrifto = () => {
  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[url('/assets/images/bg_image_pc.jpg')] bg-cover bg-center text-white">
      <div className="bg-black/70 py-16 md:py-20 px-6 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column */}
          <motion.div
            className="flex flex-col"
            variants={leftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Why Choose <span className="text-blue-500">Drifto</span>?
            </h2>

            <p className="text-lg sm:text-xl leading-relaxed max-w-xl">
              We believe the experience is everything. Drifto bridges the gap
              between hosts and users, providing a seamless platform for
              discovery, management, and booking—letting you focus on what truly
              matters: making the experience count.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col md:flex-row gap-12 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-12 md:gap-16 md:pt-52 md:pb-24">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl md:text-2xl font-bold mb-2 flex gap-2 items-center">
                  <img src="/assets/icons/fire.svg" className="h-10 md:h-12" />
                  Personalized Discovery
                </h3>
                <p className="text-lg md:text-xl">
                  Personalized recommendations based on your unique preferences
                  and location. Never miss an experience you'd love.
                </p>
              </motion.div>

              <div className="hidden md:block border-t border-gray-400" />

              <motion.div variants={itemVariants}>
                <h3 className="text-xl md:text-2xl font-bold mb-2 flex gap-2 items-center">
                  <img
                    src="/assets/icons/protected.svg"
                    className="h-8 md:h-10"
                  />
                  Secure Payments
                </h3>
                <p className="text-lg md:text-xl">
                  Book with total confidence. We use industry-standard
                  encryption to ensure every transaction is fast, transparent,
                  and 100% secure.
                </p>
              </motion.div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block border-l border-gray-400" />

            {/* Column 2 */}
            <div className="flex flex-col gap-12 md:gap-16 md:pt-24">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl md:text-2xl font-bold mb-2 flex gap-2 items-center">
                  <img src="/assets/icons/social.svg" className="h-8 md:h-10" />
                  Social Integration
                </h3>
                <p className="text-lg md:text-xl">
                  Experiences are better together. Sync with friends, see what
                  events they are attending, and coordinate your plans
                  effortlessly.
                </p>
              </motion.div>

              <div className="hidden md:block border-t border-gray-400" />

              <motion.div variants={itemVariants}>
                <h3 className="text-xl md:text-2xl font-bold mb-2 flex gap-2 items-center">
                  <img
                    src="/assets/icons/smartphone.svg"
                    className="h-8 md:h-10"
                  />
                  Mobile First
                </h3>
                <p className="text-lg md:text-xl">
                  Designed for life on the go. Access your tickets, discover
                  nearby experiences, and manage bookings instantly from our iOS
                  and Android apps.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyDrifto;
