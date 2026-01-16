import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
type Props = {};

export default function HeroComponent({}: Props) {
  return (
    <section className="w-full bg-white mt-28">
      <div className="  px-4 pb-16 md:px-6 md:py-26 ">
        <div className="flex lg:grid lg:items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-2xl md:text-7xl font-extrabold leading-tight text-gray-900 ">
                One Platform
                <br />
                <span className=" text-blue-600">for Every Experience.</span>
              </h1>
              <p className="max-w-lg text-sm md:text-xl text-gray-600">
                Drifo is the simplest way to discover and book unique local
                experiences, from hidden-gem workshops to can't-miss
                conferences. Stop searching, start doing.
              </p>
              <div className="w-full hidden md:block  space-y-6">
                <div className="flex flex-wrap items-center gap-4 w-full">
                  <Link
                    to=""
                    className="rounded-lg bg-blue-600 w-full px-6 py-3 text-center text-white text-3xl font-bold transition hover:bg-blue-400"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="flex flex-wrap justify-between gap-3">
                  {/* Google Play */}
                  <Link
                    to=""
                    className="flex w-full items-center gap-4 rounded-sm bg-black px-2 py-2 text-white transition hover:bg-gray-800 sm:w-[48%]"
                  >
                    <img
                      src="/assets/icons/google_playstore.svg"
                      className="h-10 w-10"
                      alt="Google Play"
                    />

                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-gray-300">Get it on</span>
                      <span className="text-2xl font-semibold">
                        Google Play
                      </span>
                    </div>
                  </Link>

                  {/* App Store */}
                  <Link
                    to=""
                    className="flex w-full items-center gap-4 rounded-sm bg-black px-2 py-2 text-white transition hover:bg-gray-800 sm:w-[48%]"
                  >
                    <img
                      src="/assets/icons/apple_logo_white.png"
                      className="w-10"
                      alt="App Store"
                    />

                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-gray-300">
                        Download on the
                      </span>
                      <span className="text-2xl font-semibold">App Store</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <div className="flex justify-center md:justify-end relative md:bottom-16">
            <motion.img
              className="w-1/2 lg:w-1/4 relative "
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              src="/assets/images/1st_pane.png"
            ></motion.img>{" "}
            <motion.img
              className="w-1/2 lg:w-1/4 relative top-8 md:top-16"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              src="/assets/images/2nd_pane.png"
            ></motion.img>{" "}
            <motion.img
              className="w-16 hidden lg:block lg:w-1/4"
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              src="/assets/images/3rd_pane.png"
            ></motion.img>{" "}
            <motion.img
              className="w-1/2 lg:w-1/4 hidden lg:block relative top-16"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              src="/assets/images/4th_pane.png"
            ></motion.img>
          </div>
        </div>
      </div>
    </section>
  );
}
