"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useCallback, useMemo } from "react";
import { signupSchema } from "../../../../zodschemas/signupzodschema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router =useRouter()
  const initialFormState = useMemo(() => ({
    username: "",
    email: "",
    password: "",
  }), []);

  const initialErrorState = useMemo(() => ({
    username: "",
    email: "",
    password: "",
  }), []);

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useCallback((toastText: string) => toast(toastText), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const formSubmitFunction = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
        // Validation errors (zod)
        const errors = result.error.format();
        setFormErrors({
            username: errors.username?._errors[0] || "",
            email: errors.email?._errors[0] || "",
            password: errors.password?._errors[0] || "",
        });
        return;
    }

    setFormErrors(initialErrorState);
    setIsLoading(true);

    try {
        const response = await axios.post("/api/users/sign-up", result.data);

        if (response.data.success === false) {
            showToast(response.data.error || "Signup failed");
        } else {
            showToast(response.data.message || "Signup successful");
            setFormData(initialFormState);
            router.push(`/verify-code?username=${formData.username}`);
        }

    } catch (error) {
        // Handle axios errors (including 400 status)
        if (axios.isAxiosError(error) && error.response) {
            console.error("Signup request failed", error.response.data);
            showToast(error.response.data.error || "Signup failed"); // Show backend's message
        } else {
            console.error("Signup request failed", error);
            showToast("Something went wrong. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
}, [formData, showToast, initialErrorState, initialFormState, router]);

  return (
    <div className="flex bg-[#0e0e0e]">
      <div className="h-[100vh] bg-fuchsia-700 w-[60vw] flex justify-center items-center max-md:hidden">
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

      <div className="h-[100vh] w-[40vw] max-md:w-[100vw] flex items-center justify-center">
        <form
          className="border border-gray-600 py-12 px-10 flex flex-col items-center gap-4 rounded-2xl w-[23rem]"
          onSubmit={formSubmitFunction}
        >
          <div className="text-xl pb-3 font-semibold">
            Sign-Up to{" "}
            <span className="text-fuchsia-500 font-bold text-2xl">Cronos</span>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label className="opacity-85">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="eg. SahilSharma"
              className="border-2 border-gray-500 px-5 py-2 w-full bg-transparent rounded-lg"
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label className="opacity-85">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="eg. abcxyz@gmail.com"
              className="border-2 border-gray-500 px-5 py-2 w-full bg-transparent rounded-lg"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="opacity-85">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="**********"
              className="border-2 border-gray-500 px-5 py-2 w-full bg-transparent rounded-lg"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3.5 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 bg-fuchsia-500 rounded-md flex items-center justify-center text-base font-medium hover:bg-fuchsia-600 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin duration-1000" /> : "Sign-Up"}
            </button>
            or
            <button
              type="button"
              className="py-2 px-4 rounded-md flex items-center justify-center text-fuchsia-500 border border-fuchsia-500 hover:bg-fuchsia-600 hover:text-white"
              onClick={()=>router.push("/sign-in")}
            >
              Sign-In
            </button>
          </div>
        </form>
      </div>

      <Toaster />
    </div>
  );
}
