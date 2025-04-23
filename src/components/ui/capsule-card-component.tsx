"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Generate an array of particles with random positions
const particleCount = 15;
const particles = Array.from({ length: particleCount }, (_, i) => ({
  id: i,
  top: Math.random() * 100 + "%",
  left: Math.random() * 100 + "%",
  size: Math.random() * 4 + 2, // size between 2px and 6px
}));



export default function CapsuleCardComponent() {


  return (
    <motion.div
    initial={{y:50,opacity:0 ,scale:0.9}}
    whileInView={{y:0,opacity:1,scale:1}}
    transition={{duration:0.2}}
    className="relative">
      {/* 🌟 Particle layer */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-fuchsia-400 blur-sm"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.4, 1, 0.3],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* 🌌 Capsule Card */}
      <div className="flex border items-center justify-evenly relative border-fuchsia-100/40 rounded-xl bg-gradient-to-bl from-fuchsia-300/5 via-fuchsia-300/[0.08] to-fuchsia-300/10 overflow-hidden hover:shadow-2xl hover:shadow-fuchsia-300/15 transition-all w-[450px] h-64">
        {/* image div */}

        {/* sm:w-48 md:w-64 lg:w-64 */}
        <div className="capsule-image min-w-[215px]">
          <motion.div
            animate={{
              y: [0, -15, 10, -15, 10, 0],
              x: [0, 8, 0, 8, 0],
              rotate: [0, 2, -2, 1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="-translate-x-3"
          >
            <Image
              src="/sign-in-page-image.png"
              alt="alt"
              width={250}
              height={250}
            />
          </motion.div>
        </div>

        {/* details div */}
        <div className="capsule-data flex flex-col items-start h-full justify-center gap-2 pr-3 py-1 text-wrap">
          <p className="capsule-timer-heading font-bold text-xl text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40 py-1">
            Capsule Head
          </p>

          {/* created date */}
          <p>
            <span className="text-white font-bold drop-shadow-none opacity-50">
              Created At{" "}
            </span>
            :{" "}
            <span className="capsule-timer-heading font-bold text-base text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40">
              20 12 2021
            </span>
          </p>

          {/* opening date */}
          <p>
            <span className="text-white font-bold drop-shadow-none opacity-50">
              Created At{" "}
            </span>
            :{" "}
            <span className="capsule-timer-heading font-bold text-base text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40">
              20 12 2025
            </span>
          </p>
          {/* description */}
          <p className="capsule-timer-heading font-bold text-sm text-fuchsia-100 text-wrap drop-shadow-fuchsia-200/60 opacity-50">
            Description : Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Facere obcaecati
          </p>
        </div>
      </div>
    </motion.div>
  );
}
