"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyCodePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const router = useRouter();

  const showToast = (toastText: string) => toast(toastText);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const filled = [...otp];
    pasteData.forEach((char, idx) => {
      if (/^\d$/.test(char) && idx < 6) filled[idx] = char;
    });
    setOtp(filled);
  };

  const handleSubmitFunction = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      showToast("Please enter the full 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/users/verify", {
        username,
        verifyCode: finalOtp,
      });

      if (!res.data.success) {
        showToast(res.data.error);
      } else {
        showToast(res.data.message);
        router.push("/sign-in");
      }
    } catch (error) {
        console.log(error)
      showToast("Unexpected error, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-[#0e0e0e]">
      <div className="verify-code-box p-10 border border-gray-500 flex flex-col items-center justify-center gap-6 rounded-2xl max-sm:scale-75 max-sm:px-3 max-sm:py-7">
        <Image
          src={"/cronos-logo.png"}
          height={200}
          width={200}
          alt="Cronos Logo"
        />
        <p className="text-xl font-bold text-white">Enter Verification Code</p>

        <div className="flex gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[index] = el!;
              }}
              className="w-12 h-14 text-center text-xl bg-transparent text-white border border-gray-500 rounded-md focus:outline-fuchsia-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmitFunction}
          className="mt-4 py-2 px-4 bg-fuchsia-500 rounded-md text-white hover:bg-fuchsia-600"
        >
          {isLoading ? (
            <Loader2 className="animate-spin duration-1000" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <Toaster />
    </div>
  );
}
