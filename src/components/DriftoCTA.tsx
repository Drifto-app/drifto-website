import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function DriftoCTA() {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 px-6 sm:px-12 lg:px-24">
      <motion.div
        className="relative bg-blue-500 rounded-3xl overflow-hidden
        px-6 py-14
        sm:px-10 sm:py-16
        md:px-20 md:py-24
        lg:px-36 lg:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Decorative circles */}
        <motion.div
          className="absolute top-0 left-0
          w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64
          bg-blue-400 rounded-full opacity-30
          -translate-x-20 -translate-y-20 sm:-translate-x-28 sm:-translate-y-28 lg:-translate-x-32 lg:-translate-y-32"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <motion.div
          className="absolute bottom-0 right-0
          w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64
          border-8 border-white rounded-full
          translate-x-20 translate-y-20 sm:translate-x-32 sm:translate-y-32 lg:translate-x-40 lg:translate-y-40"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            className="text-white max-w-2xl text-center lg:text-left"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience more?
            </h2>
            <p className="text-base hidden md:block sm:text-lg text-blue-50">
              Join thousands of experience enthusiasts waiting for the launch of
              Drifto. Be among the first to experience the future of experience
              booking.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col gap-4 w-full sm:w-auto items-center lg:items-start"
            variants={itemVariants}
          >
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

            <button className="w-full sm:w-auto bg-black text-white rounded-lg px-6 py-4 font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-2">
              Get started <span>→</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
