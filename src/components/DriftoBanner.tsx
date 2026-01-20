import React from "react";
import { motion } from "framer-motion";
import { driftoBanner } from "@/assets";

type Props = {};

export default function DriftoBanner({ }: Props) {
  return (
    <motion.div
      className="px-6 w-screen pt-20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <img className=" w-full" src={driftoBanner} />
    </motion.div>
  );
}
