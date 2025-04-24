"use client";
import { Bell, Check, Plus, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"

export default function HomePageLayout() {

  const [friendRequests, setFriendRequests] = useState<string[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);





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

    if (isNotificationBarVisible) {
      setLoadingRequests(true);
      fetch("/api/get-friend-requests")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFriendRequests(data.friendRequests);
          } else {
            setFriendRequests([]);
          }
        })
        .catch(() => setFriendRequests([]))
        .finally(() => setLoadingRequests(false));
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
          className="h-full flex flex-col items-center px-6 py-10 text-white text-center"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>

          {loadingRequests ? (
            <p className="text-sm text-fuchsia-200">Loading...</p>
          ) : friendRequests.length > 0 ? (
            <ul className="space-y-2 w-full">
              {friendRequests.map((username, index) => (
                <li
                  key={index}
                  className="bg-purple-800/40 px-4 py-2 rounded-lg text-left flex justify-between items-center"
                >
                  {username} <p className="flex gap-2">
                    <Check size={36} className="text-green-500 px-2 py-1 bg-white/5 hover:bg-white/15 rounded text-2xl" />
                    <Plus size={36} className="rotate-90 text-red-500 px-2 py-1 bg-white/5 hover:bg-white/15 rounded text-2xl" />
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-fuchsia-200">No new friend requests</p>
          )}
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
