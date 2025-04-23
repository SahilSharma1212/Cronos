"use client";
import { Bell, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"

export default function HomePageLayout() {


  const router = useRouter();
  const pathname = usePathname();

  const [isNotificationBarVisible, setIsNotificationBarVisible] = useState(false);
  const [bgLocationStyle, setBgLocationStyle] = useState("left-0");

  useEffect(() => {
    const positions: Record<string, string> = {
      "/main/home": "visible left-0",
      "/main/latest": "visible left-[95px]",
      "/main/create": "visible left-[190px]",
    };

    for (const path in positions) {
      if (pathname.includes(path)) {
        setBgLocationStyle(positions[path]);
        break;
      }
    }
  }, [pathname]);


  useEffect(() => {
    if (isNotificationBarVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isNotificationBarVisible]);


  return (
    <div className="relative border-b border-b-fuchsia-300/35 bg-gradient-to-br  from-purple-950/70 via-purple-800/20 to-purple-500/10 z-40">

      {/* Notifications Bar */}
      <div
        className={`
          notifications-bar h-screen absolute left-0 top-0 z-40 bg-purple-950
          overflow-hidden transition-all duration-500
          ${isNotificationBarVisible ? "w-96" : "w-0"}
        `}
      >
        <X
          onClick={() => setIsNotificationBarVisible(false)}
          className="m-4 cursor-pointer"
        />
        <motion.div
          className="h-full flex items-center justify-center text-white font-semibold text-lg px-4 text-center"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Notification feature not added yet
        </motion.div>

      </div>

      {/* Navbar */}
      <div className="flex w-screen justify-evenly items-center py-4 text-white px-5">
        {/* Bell Icon */}
        <div
          className="p-4 rounded-xl bg-fuchsia-300/5 hover:bg-fuchsia-300/15 cursor-pointer"
          onClick={() => setIsNotificationBarVisible(!isNotificationBarVisible)}
        >
          <Bell />
        </div>

        {/* Main Nav */}
        <div className="relative mx-auto w-full max-w-[260px]">
          <div className="flex justify-between items-center h-8 relative">
            {!pathname.includes("/main/profile") && (
              <div
                className={`absolute bg-fuchsia-300/15 w-[70px] h-full transition-all duration-500 rounded-lg ${bgLocationStyle}`}
              />
            )}

            <p
              className="z-10 w-[70px] text-center text-sm cursor-pointer"
              onClick={() => router.push("/main/home")}
            >
              HOME
            </p>
            <p
              className="z-10 w-[70px] text-center text-sm cursor-pointer"
              onClick={() => router.push("/main/latest")}
            >
              LATEST
            </p>
            <p
              className="z-10 w-[70px] text-center text-sm cursor-pointer"
              onClick={() => router.push("/main/create")}
            >
              CREATE
            </p>
          </div>
        </div>

        {/* Profile Circle */}
        <div className="h-10 w-10 rounded-full bg-red-400 cursor-pointer" onClick={() => router.push('/main/profile')} />
      </div>
    </div>
  );
}
