import React from "react";
import { motion } from "framer-motion";
type SimpleButtonProps = {
  text: string;
  type: string;
};
export default function SimpleButton({ text, type }: SimpleButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      className={
        type === "prefered"
          ? "bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded transition-all duration-300 ease-in-out self-center shadow-lg shadow-cyan-300/30 z-50 cursor-pointer"
          : "px-6 py-2 border border-cyan-500 rounded text-cyan-500 text-shadow hover:bg-cyan-500 hover:text-white z-50 transition hover:border-cyan-500 cursor-pointer font-semibold backdrop-blur-2xl shadow-lg shadow-cyan-300/30"
      }
      
    >
      {text}
    </motion.div>
  );
}
