"use client";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CreditCard, FolderArchive, Sparkle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <BackgroundGradientAnimation>

        {/* background capsule image */}
        <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <Image
            height={2300}
            width={2300}
            alt="futuristic-clock-image"
            src="/background-clock-dial-purple.png"
            className="animate-spin mix-blend-color-burn opacity-65"
            style={{ animationDuration: "150s" }}
          />
        </div>

        {/* capsule-image */}
        <motion.div
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-49
          h-[780] w-[780]
          max-md:top-[40%] max-md:left-[50%] max-md:-translate-x-[51%] max-md:-translate-y-[50%]
          max-lg:  
          "
          animate={{
            y: [0, -15, 10, -15, 10, 0], // floating path
            x: [0, 8, 0, 8, 0],
            rotate: [0, 2, -2, 1, 0], // slight tilt
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            fill
            alt="cronos-capsule-image"
            src="/purple-capsule-variant.png"
          />
        </motion.div>

        {/* rings-image */}
        <div className="rings-images-div max-md:hidden">
          {/* biggest ring */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-[75%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50
            max-md:left-[25%] max-md:top-[80%]
            "
          >
            <div className="relative w-[400px] sm:w-[250px] max-sm:w-[180px] h-[300px]">
              <Image
                src="/purple-ring-variant.png"
                alt="biggest-ring"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* middle ring */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-[82%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50
            max-md:left-[25%] max-md:top-[85%]
            "
          >
            <div className="relative w-[250px] sm:w-[220px] max-sm:w-[150px] h-[280px]">
              <Image
                src="/purple-ring-variant.png"
                alt="middle-ring"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* smallest ring */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute top-[88%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50
            max-md:left-[25%] max-md:top-[90%]
            "
          >
            <div className="relative w-[200px] sm:w-[180px] max-sm:w-[120px] h-[250px]">
              <Image
                src="/purple-ring-variant.png"
                alt="smallest-ring"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* navbar */}
        <nav className="h-20 w-full absolute top-0 flex items-center px-10 justify-around">
          <div className="cronos-logo z-50">
            <Image
              height={35}
              src={"/cronos-logo.png"}
              width={130}
              alt="cronos-logo"
            />
          </div>

          <div className="auth-buttons flex gap-5 items-center max-sm:scale-[0.85] z-50">
            {/* preffered button */}
            <button className="bg-fuchsia-500 bg-f hover:bg-fuchsia-600 text-white font-semibold py-2 px-6 rounded transition-all duration-300 ease-in-out self-center shadow-lg shadow-fuchsia-300/30 z-50 cursor-pointer max-sm:px-3 max-sm:text-base max-sm:font-medium">
              <Link href={"/sign-up"}>Sign-up</Link>
            </button>

            {/* un-preffered button */}
            <button className="px-6 py-2 border border-fuchsia-500 rounded text-fuchsia-500 text-shadow hover:bg-fuchsia-500 hover:text-white z-50 transition hover:border-fuchsia-500 cursor-pointer font-semibold backdrop-blur-2xl shadow-lg shadow-fuchsia-300/30  max-sm:px-3 max-sm:text-base max-sm:font-medium">
              <Link href={"/sign-in"}>Sign-in</Link>
            </button>
          </div>
        </nav>

        {/* INFO BOX 1 TIMELESS VAULT*/}
        <motion.div
          className="absolute top-[25%] left-[12.5%] z-50 pointer-events-none
          max-[460px]:scale-[0.60] max-[460px]:left-[42%]
          max-sm:scale-[0.70] max-sm:left-[52%] max-sm:w-44 max-sm:top-[52%]
          max-md:top-[45%] max-md:left-[62%]
          max-lg:scale-[0.75] max-lg:top-[15%] max-lg:left-[2%]
          max-xl:scale-[0.80]
          max-2xl:scale-90
          "
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
        >
          <motion.div
            className="bg-fuchsia-300/20 backdrop-blur-md rounded-xl p-4 w-64 text-white flex flex-col items-center shadow-xl shadow-fuchsia-300/15 gap-3
            
            max-sm:w-44"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1
              className="text-2xl font-bold text-fuchsia-200 text-shadow text-shadow-fuchsia-300"
              style={{ textAlign: "center" }}
            >
              Timeless Vaults
            </h1>
            <hr className="w-full h-[1px] bg-gradient-to-r from-fuchsia-800/5 via-fuchsia-300 to-fuchsia-700/5 border-0 " />
            <p className="text-sm text-center max-sm:hidden">
              Securely store your moments and memories for future retrieval,
              wrapped in digital permanence.
            </p>
            <CreditCard className="sm:hidden" />
          </motion.div>
        </motion.div>

        {/* INFO BOX 2 INFINITE ARCHIVES*/}
        <motion.div
          className="absolute top-[50%] left-[3%] z-50 pointer-events-none
          max-[460px]:scale-[0.60] max-[460px]:left-[12%]
          max-sm:scale-[0.70] max-sm:left-[15%]
          max-md:top-[32%] max-md:left-[17%] max-md:-translate-x-[45%]
          max-lg:scale-[0.75] max-lg:top-[35%] max-lg:left-[2%]
          max-xl:scale-[0.80] max-xl:left-0
          max-2xl:scale-90
          "
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
        >
          <motion.div
            className="bg-fuchsia-300/20 backdrop-blur-md rounded-xl p-4 w-64 text-white flex flex-col items-center shadow-xl shadow-fuchsia-300/15 gap-3
            
            max-sm:w-44
            "
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1
              className="text-2xl font-bold text-fuchsia-200 text-shadow text-shadow-fuchsia-300 flex items-center justify-center"
              style={{ textAlign: "center" }}
            >
              Infinite Archives
            </h1>
            <hr className="w-full h-[1px] bg-gradient-to-r from-fuchsia-800/5 via-fuchsia-300 to-fuchsia-700/5 border-0 " />
            <p className="text-sm text-center max-sm:hidden">
              Access a beautifully organized, personalized timeline of
              encapsulated memories and milestones.
            </p>

            <FolderArchive className="sm:hidden" />
          </motion.div>
        </motion.div>

        {/* INFO BOX 3 CRONO SNAPSHOTS*/}
        <motion.div
          className="absolute top-[50%] left-[22%] z-49 pointer-events-none
          max-[460px]:scale-[0.60] max-[460px]:left-[65%] 
          max-sm:scale-[0.70] max-sm:left-[65%] 
          max-md:top-[16%] max-md:left-[60%]
          max-lg:scale-[0.75] max-lg:top-[60%] max-lg:left-[2%]
          max-xl:scale-[0.80]
          max-2xl:scale-90
          "
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
        >
          <motion.div
            className="bg-fuchsia-300/20 backdrop-blur-md rounded-xl p-4 w-64 text-white flex flex-col items-center shadow-xl shadow-fuchsia-300/15 gap-3
            
            max-sm:w-44"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1
              className="text-2xl font-bold text-fuchsia-200 text-shadow text-shadow-fuchsia-300"
              style={{ textAlign: "center" }}
            >
              Chrono Snapshots
            </h1>
            <hr className="w-full h-[1px] bg-gradient-to-r from-fuchsia-800/5 via-fuchsia-300 to-fuchsia-700/5 border-0 " />
            <p className="text-sm text-center max-sm:hidden">
              Capture your experiences in elegant, date-locked capsules that
              unlock at your chosen time.
            </p>
            <Sparkle className="sm:hidden" />
          </motion.div>
        </motion.div>

        {/* BIG INFO BOX - RIGHT SIDE */}
        <motion.div
          className="absolute top-[30%] right-[6%] z-50 bg-fuchsia-300/20 backdrop-blur-md rounded-2xl p-6 w-[400px] max-w-[90vw] text-white shadow-xl shadow-fuchsia-300/20 flex flex-col gap-6 items-center

          max-xl:scale-90 max-xl:w-96 max-xl:top-[30%] max-xl:right-[2%]

          max-lg:scale-[0.8] max-lg:w-72 max-lg:top-[20%] max-lg:right-[0%]

          max-md:top-[65%] max-md:w-[40rem] max-md:right-[50%] max-md:translate-x-[50%]

          max-sm:top-[75%]
          "
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2
            className="text-3xl font-bold text-fuchsia-200 text-shadow text-shadow-fuchsia-300"
            style={{ textAlign: "center" }}
          >
            Welcome to Cronos
          </h2>
          <p className="text-base leading-relaxed text-center max-sm:hidden">
            Cronos lets you create time capsules of your most valuable thoughts,
            memories, and stories. Whether it’s for your future self, loved
            ones, or the world – store it, lock it, and let it open when the
            time is right.
          </p>

          <button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 ease-in-out self-center shadow-lg shadow-fuchsia-300/30">
            <Link href={"/sign-up"}>Get Started</Link>
          </button>
        </motion.div>

        {/* top left moving transparent capsule */}
        <motion.div
          animate={{
            y: [8, -60, 33, -24, 4, 32], // floating path
            x: [30, -48, 22, -38, 15],
            rotate: [1, 3, -2, 1, 2], // slight tilt
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-60 -top-[420px] h-[900px] w-[900px] z-10  opacity-20 rotate-45"
        >
          <Image
            fill
            src={"/capsule-landing-page-side-capsule-1.png"}
            alt="side-images"
          />
        </motion.div>

        {/* top left moving transparent capsule */}
        <motion.div
          animate={{
            y: [8, -60, 33, -24, 4, 32], // floating path
            x: [30, -48, 22, -38, 15],
            rotate: [1, 3, -2, 1, 2], // slight tilt
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-60 -bottom-[420px] h-[900px] w-[900px] z-40  opacity-10 -rotate-45"
        >
          <Image
            fill
            src={"/capsule-landing-page-side-capsule-2.png"}
            alt="side-images"
          />
        </motion.div>


        {/* <motion.div
      className="w-96 h-96 opacity-75 rounded-full absolute z-50 bg-gradient"
      animate={{
        x: [0, 10, -10, 0],
        y: [0, -10, 10, 0],
        opacity: [1, 0.8, 1],
        scale: [1, 1.5, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{background: 'radial-gradient(circle, #c98bfc 0%,#b865fc 15%,#b266ff 25%,#9933ff 35%,transparent 55%)',opacity:"40%",mixBlendMode:"screen"}}
    /> */}
      </BackgroundGradientAnimation>
    </div>
  );
}
