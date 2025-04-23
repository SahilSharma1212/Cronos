"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {motion} from "framer-motion"


const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
      const delay = i * 0.5
      return {
          pathLength: 1,
          opacity: 1,
          transition: {
              pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
              opacity: { delay, duration: 0.01 },
          },
      }
  },
}
const image: React.CSSProperties = {
  maxWidth: "80vw",
}

const shape: React.CSSProperties = {
  strokeWidth: 10,
  strokeLinecap: "round",
  fill: "transparent",
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/sign-in", {
        identifier: email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successful!");
        router.push("/main/profile"); // Change route after login
      }
    } catch (error) {
      const message =
        error|| "Something went wrong";
      toast.error(message as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#0e0e0e]">
      <div className="h-[100vh] w-[40vw] max-md:w-[100vw] flex items-center justify-center">
        <form
          onSubmit={handleSignIn}
          className="border border-gray-600 py-12 px-10 flex flex-col items-center gap-4 rounded-2xl w-[23rem]"
        >
          <div className="text-xl pb-3 font-semibold">
            Sign-In to{" "}
            <span className="text-fuchsia-500 font-bold text-2xl">Cronos</span>
          </div>

          {/* email */}
          <div className="input-email-div flex flex-col gap-1 w-full">
            <label className="opacity-85">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eg. abcxyz@gmail.com"
              className="border-2 border-gray-500 px-5 py-2 w-full bg-transparent rounded-lg text-white"
            />
          </div>

          {/* password */}
          <div className="input-password-div flex flex-col gap-1 w-full">
            <label className="opacity-85">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="eg. Sahil Sharma"
              className="border-2 border-gray-500 px-5 py-2 w-full bg-transparent rounded-lg text-white"
            />
          </div>

          {/* signin and signup buttons */}
          <div className="flex items-center justify-end gap-3.5 pt-2">
            <button
              type="submit"
              className="py-2 px-4 bg-fuchsia-500 rounded-md flex items-center justify-center text-base font-medium hover:bg-fuchsia-600"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin duration-1000"/> : "Sign-In"}
            </button>
            or
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="py-2 px-4 rounded-md flex items-center justify-center text-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-600 hover:text-white"
            >
              Sign-Up
            </button>
          </div>
        </form>
      </div>

      <div className="h-[100vh] bg-fuchsia-800 w-[60vw] flex justify-center items-center max-md:hidden">
      <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate="visible"
            style={image}
        >
            <motion.circle
                className="circle-path"
                cx="100"
                cy="100"
                r="80"
                stroke="#ff0088"
                variants={draw}
                custom={1}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="30"
                x2="360"
                y2="170"
                stroke="#4ff0b7"
                variants={draw}
                custom={2}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="170"
                x2="360"
                y2="30"
                stroke="#4ff0b7"
                variants={draw}
                custom={2.5}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="30"
                rx="20"
                stroke="#0d63f8"
                variants={draw}
                custom={3}
                style={shape}
            />
            <motion.circle
                cx="100"
                cy="300"
                r="80"
                stroke="#0d63f8"
                variants={draw}
                custom={2}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="230"
                x2="360"
                y2="370"
                stroke="#ff0088"
                custom={3}
                variants={draw}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="370"
                x2="360"
                y2="230"
                stroke="#ff0088"
                custom={3.5}
                variants={draw}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="230"
                rx="20"
                stroke="#4ff0b7"
                custom={4}
                variants={draw}
                style={shape}
            />
            <motion.circle
                cx="100"
                cy="500"
                r="80"
                stroke="#4ff0b7"
                variants={draw}
                custom={3}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="430"
                x2="360"
                y2="570"
                stroke="#0d63f8"
                variants={draw}
                custom={4}
                style={shape}
            />
            <motion.line
                x1="220"
                y1="570"
                x2="360"
                y2="430"
                stroke="#0d63f8"
                variants={draw}
                custom={4.5}
                style={shape}
            />
            <motion.rect
                width="140"
                height="140"
                x="410"
                y="430"
                rx="20"
                stroke="#ff0088"
                variants={draw}
                custom={5}
                style={shape}
            />
        </motion.svg>
      </div>
    </div>
  );
}
