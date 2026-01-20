import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { googlePlaystore, appleLogoWhite, heroPane1, heroPane2, heroPane3, heroPane4 } from "@/assets";

type Props = {};

export default function HeroComponent({ }: Props) {
  return (
    <section id="hero" className="w-full bg-white mt-9 md:mt-0">
      <div className="px-3 pb-16 md:px-8 md:py-26">
        <div className="flex lg:grid lg:items-start gap-6 lg:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-3 md:space-y-6 max-w-2xl lg:pt-20">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-12 lg:leading-14 text-gray-900">
                <span className="whitespace-nowrap">One Platform for</span>
                <br />
                <span className="whitespace-nowrap text-blue-600">Every Experience.</span>
              </h1>
              <p className="max-w-lg text-sm md:text-xl leading-tight md:text-xl text-gray-600">
                Drifo is the simplest way to discover and book unique local
                experiences, from hidden-gem workshops to can't-miss
                conferences. Stop searching, start doing.
              </p>
              <div className="w-full md:block space-y-4 md:space-y-6 lg:pr-15">
                <div className="flex flex-wrap items-center gap-4 w-full">
                  <button
                    onClick={() => window.open(import.meta.env.VITE_DRIFTO_WEBAPP_URL, "_blank")}
                    className="rounded-lg bg-blue-600 w-full px-6 py-3 md:py-4 text-center text-white text-sm md:text-lg font-bold transition hover:bg-blue-400 cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
                <div className="flex flex-wrap justify-between gap-2 md:gap-3">
                  {/* Google Play */}
                  <a
                    href={import.meta.env.VITE_DRIFTO_PLAYSTORE_URL}
                    target="_blank"
                    className="flex w-full items-center gap-2 md:gap-4 rounded-lg bg-black px-3 py-2 md:px-4 md:py-3 text-white transition hover:bg-gray-800 sm:w-[48%]"
                  >
                    <img
                      src={googlePlaystore}
                      className="h-6 w-6 md:h-10 md:w-10"
                      alt="Google Play"
                    />

                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px]  md:text-xs text-gray-300">Get it on</span>
                      <span className="text-base md:text-xl lg:text-xl font-semibold">
                        Google Play
                      </span>
                    </div>
                  </a>

                  {/* App Store */}
                  <a
                    href={import.meta.env.VITE_DRIFTO_APPSTORE_URL}
                    target="_blank"
                    className="flex w-full items-center gap-2 md:gap-4 rounded-lg bg-black px-3 py-2 md:px-4 md:py-3 text-white transition hover:bg-gray-800 sm:w-[48%]"
                  >
                    <img
                      src={appleLogoWhite}
                      className="h-6 w-6 md:h-10 md:w-10"
                      alt="App Store"
                    />

                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] md:text-xs text-gray-300">
                        Download on the
                      </span>
                      <span className="text-base md:text-xl lg:text-xl font-semibold">App Store</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <div className="flex justify-center md:justify-end relative md:bottom-16">
            <motion.img
              className="w-1/2  lg:w-1/4 relative"
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: 1
              }}
              transition={{
                y: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0,
                },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
              src={heroPane1}
            ></motion.img>{" "}
            <motion.img
              className="w-1/2  lg:w-1/4 relative top-8 md:top-16"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: [0, 14, 0],
                opacity: 1
              }}
              transition={{
                y: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.6,
                },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
              src={heroPane2}
            ></motion.img>{" "}
            <motion.img
              className="w-16 hidden lg:block lg:w-1/4"
              initial={{
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: [0, -8, 0],
                opacity: 1
              }}
              transition={{
                y: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1.2,
                },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
              src={heroPane3}
            ></motion.img>{" "}
            <motion.img
              className="w-1/2 lg:w-1/4 hidden lg:block relative top-16"
              initial={{
                y: 50,
                opacity: 0,
              }}
              animate={{
                y: [0, 12, 0],
                opacity: 1
              }}
              transition={{
                y: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1.8,
                },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
              src={heroPane4}
            ></motion.img>
          </div>
        </div>
      </div>
    </section>
  );
}
