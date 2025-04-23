"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";


export default function CreatePage() {
  const [openingDate, setOpeningDate] = useState("");
  const [capsuleName, setCapsuleName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time part for clean comparison

    if (selectedDate < today) {
      toast.error("Opening date cannot be in the past!");
      setOpeningDate(""); // clear invalid input
      return;
    }

    setOpeningDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (!capsuleName || !content || !openingDate) {
      toast.error("Please fill all the required fields!");
      return;
    }

    try {
      const res = await axios.post("/api/capsule-operations/create-capsule", {
          capsuleName,
          description,
          content,
          privacyType: toggleposition === "left-0" ? "private" : "public",
          openingDate,
          imagesArray: []
        })

        const data = res.data;

      if (data.success) {
        toast.success("Capsule created successfully!");
        // Optionally reset fields:
        setCapsuleName("");
        setDescription("");
        setContent("");
        setOpeningDate("");
        setToggleposition("left-0");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error creating capsule:", err);
      toast.error("Server error. Try again later.");
    }
  };


  const [toggleposition, setToggleposition] = useState('left-0')

  return (
    <div className="relative h-screen max-h-screen">



      {/* capsule-image */}
      <motion.div
        className="absolute -top-28 left-[50%] translate-x-[-50%] z-10
          h-[800px] w-[800px] pointer-events-none
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
      <div
        className="relative top-[330px] rings-images-div max-md:hidden">
        {/* biggest ring */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute -top-[20px] left-[50%] translate-x-[-50%] z-10
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
          className="absolute top-[20px] translate-x-[-50%] left-[50%] z-10
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
          className="absolute top-[55px] translate-x-[-50%] left-[50%] z-10"
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

      {/* capsule name */}
      <motion.div
        animate={{ y: [-3, 5, 0, 6, -3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute py-4 px-2 bg-fuchsia-300/10 backdrop-blur-2xl rounded-xl border border-fuchsia-200/40 inline-flex flex-col gap-2 z-30 shadow-xl shadow-fuchsia-300/20 top-9 left-[25%]">
        <label
          htmlFor="name"
          className="text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40"
        >
          Name of the Capsule
        </label>
        <input
          name="name"
          className="text-white border border-fuchsia-200/70 rounded-md focus:outline-fuchsia-500/50 z-30 px-3 py-2"
          type="text"
          placeholder="Capsule name"
          value={capsuleName}
          onChange={(e) => setCapsuleName(e.target.value)}
        />
      </motion.div>

      {/* capsule description */}
      <motion.div
        animate={{ y: [-3, 5, 0, 6, -3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute py-4 px-2 bg-fuchsia-300/10 backdrop-blur-2xl rounded-xl border border-fuchsia-200/40 inline-flex flex-col gap-2 z-30 shadow-xl shadow-fuchsia-300/20 left-[10%] top-64">
        <label
          htmlFor="description"
          className="text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40"
        >
          Description
        </label>
        <textarea
          name="description"
          className="text-white border border-fuchsia-200/70 rounded-md focus:outline-fuchsia-500/50 z-30 px-3 py-2 w-96 h-48"
          placeholder="Write a short preview or a description about what your capsule is about"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </motion.div>

      {/* capsule content */}
      <motion.div
        animate={{ y: [-13, 19, 2, 16, -15] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute py-4 px-2 bg-fuchsia-300/10 backdrop-blur-2xl rounded-xl border border-fuchsia-200/40 inline-flex flex-col gap-2 z-30 shadow-xl shadow-fuchsia-300/25 right-[10%] top-64">
        <label
          htmlFor="content"
          className="text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40"
        >
          Content
        </label>
        <textarea
          name="content"
          className="text-white border border-fuchsia-200/70 rounded-md focus:outline-fuchsia-500/50 z-30 px-3 py-2 h-48 w-96"
          placeholder="Actual content of the capsule goes here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </motion.div>

      {/* capsule opening date */}
      <motion.div
        animate={{ y: [-5, 6, 1, 8, -4] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute py-4 px-2 bg-fuchsia-300/10 backdrop-blur-2xl rounded-xl border border-fuchsia-200/40 inline-flex flex-col gap-2 z-30 shadow-xl shadow-fuchsia-300/25 top-9 right-[25%]"
      >
        <label
          htmlFor="content"
          className="text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40"
        >
          Opening Date
        </label>
        <input
          type="date"
          value={openingDate}
          onChange={handleDateChange}
          className="px-3 py-2 rounded-lg border border-fuchsia-200/70 focus:outline-none focus:ring-2 focus:outline-fuchsia-500/50 text-white bg-transparent"
        />
      </motion.div>

      {/* privacy button */}
      <motion.div
        className="gap-5 p-3 bg-fuchsia-300/10 backdrop-blur-2xl inline-flex absolute top-28 left-12 rounded-xl border border-fuchsia-200/40 shadow-xl shadow-fuchsia-300/25"
        animate={{ y: [-4, 3, -2, 5, 0, 4] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <p className="text-fuchsia-100 drop-shadow-lg drop-shadow-fuchsia-300/40">{toggleposition === "left-0" ? "Private" : "Public"}</p>
        {/* toggle div button */}

        <div className={`p-1 ${toggleposition === "left-0" ? "bg-white/5" : "bg-fuchsia-900/15"} border-fuchsia-200/50 border inline-block rounded-full`}>
          <div
            className="relative w-10 h-4 backdrop-blur-2xl rounded-full cursor-pointer transition-all"
            onClick={() => {
              setToggleposition(toggleposition === "left-0" ? "right-0" : "left-0");
            }}
          >
            <motion.div
              animate={{ x: toggleposition === "left-0" ? 0 : 24 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 h-4 w-4 rounded-full bg-fuchsia-200"
            />
          </div>
        </div>
      </motion.div>

      {/* submit button */}
      <motion.button
        className="gap-5 p-3 bg-fuchsia-400/30 backdrop-blur-2xl inline-flex absolute top-28 right-16 rounded-xl border border-fuchsia-200/40 shadow-xl shadow-fuchsia-300/25 cursor-pointer"
        animate={{ y: [-4, 3, -2, 5, 0, 4] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.75 }}
        transition={{ duration: 10, repeat: Infinity }}
        onClick={handleSubmit}
      >
        <p>Submit</p>
      </motion.button>

      <Toaster />
    </div>
  );
}
