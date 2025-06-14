"use client";
import { Bell, Check, Loader2, Search, UserPlus, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";


export default function HomePageLayout() {
  const [friendRequests, setFriendRequests] = useState<string[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [isNotificationBarVisible, setIsNotificationBarVisible] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const timeref = useRef<NodeJS.Timeout | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [sendingFriendRequests, setSendingFriendRequests] = useState(false)

  const friendRequestSentToast = (message: string) => toast(message);

  useEffect(() => {
    if (timeref.current) {
      clearTimeout(timeref.current);
    }

    timeref.current = setTimeout(() => {
      if (searchVal.trim() !== "") {
        axios
          .post("/api/users/get-users-from-search", { username: searchVal })
          .then((res) => {
            console.log(res.data.users);
            setSearchResults(res.data.users || []); // set results here
          })
          .catch((err) => {
            console.error("Search error:", err);
            setSearchResults([]); // handle error and clear results
          });
      } else {
        setSearchResults([]); // optional: clear results if input is empty
      }
    }, 2000);
  }, [searchVal]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isNotificationBarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
    <div className="relative border-b border-b-fuchsia-300/35 bg-gradient-to-br from-purple-950/70 via-purple-800/20 to-purple-500/10 z-40">
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
            <Loader2 className="animate-spin" />
          ) : friendRequests.length > 0 ? (
            <ul className="space-y-2 w-full">
              {friendRequests.map((username, index) => (
                <li
                  key={index}
                  className="bg-purple-800/40 px-4 py-2 rounded-lg text-left flex justify-between items-center"
                >
                  {username}
                  <p className="flex gap-2">
                    <Check
                      size={36}
                      className="text-green-500 px-2 py-1 bg-white/5 hover:bg-white/15 rounded text-2xl"
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/accept-friend-request", { userWhoSentRequest: username });
                          if (response.status === 200) {
                            console.log("friend request accepted");
                            friendRequestSentToast(`Friend request accepted! You and ${username} are now friends!`);

                            // ✅ REMOVE the user from friendRequests list
                            setFriendRequests((prev) => prev.filter((user) => user !== username));
                          } else {
                            friendRequestSentToast(`An unknown error occurred`);
                          }
                        } catch (error) {
                          console.error("Accept friend request error", error);
                          friendRequestSentToast(`Failed to accept friend request.`);
                        }
                      }}
                    />

                    <X
                      size={36}
                      className="rotate-90 text-red-500 px-2 py-1 bg-white/5 hover:bg-white/15 rounded text-2xl"
                      onClick={async () => {
                        const response = await axios.post("/api/delete-friend-request", { userWhoSentRequest: username })
                        console.log('friend request declined')
                        if (response.status === 200) {
                          friendRequestSentToast("Friend request declined")
                        }
                      }}

                    />
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
        <div className="relative mx-auto w-full flex justify-center gap-4 items-center h-8">
          {/* home */}
          <p
            className={`z-10 w-[70px] text-center text-sm cursor-pointer transition duration-200 ${pathname.includes("/main/home")
              ? " text-lg -translate-y-1 text-fuchsia-200 drop-shadow-xl drop-shadow-fuchsia-200/50 transition"
              : ""
              }`}
            onClick={() => router.push("/main/home")}
          >
            HOME
          </p>
          {/* latest */}
          <p
            className={`z-10 w-[70px] text-center text-sm cursor-pointer transition duration-200 ${pathname.includes("/main/latest")
              ? "text-lg -translate-y-1 text-fuchsia-200 drop-shadow-xl drop-shadow-fuchsia-200/50 transition"
              : ""
              }`}
            onClick={() => router.push("/main/latest")}
          >
            LATEST
          </p>
          {/* create */}
          <p
            className={`z-10 w-[70px] text-center text-sm cursor-pointer transition duration-200 ${pathname.includes("/main/create")
              ? "text-lg -translate-y-1 text-fuchsia-200 drop-shadow-xl drop-shadow-fuchsia-200/50 transition"
              : ""
              }`}
            onClick={() => router.push("/main/create")}
          >
            CREATE
          </p>
          {/* Search */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="w-72 rounded-full px-4 py-1 bg-white/5 focus:border focus:border-fuchsia-300/75"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <Search />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 bg-purple-900/80 backdrop-blur-sm border border-fuchsia-300/30 rounded-xl w-72 max-h-64 overflow-y-auto text-sm z-50">
                {searchResults.map((user, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-purple-800/50 cursor-pointer text-white flex justify-between"
                  >
                    <p
                      onClick={() => {
                        router.push(`/main/profile/${user}`);
                        setSearchVal("");
                        setSearchResults([]); // Clear search results when user clicks
                      }}>{user}</p>

                    {sendingFriendRequests === true ? <Loader2 className="animate-spin" /> : <UserPlus
                      onClick={async () => {
                        try {
                          setSendingFriendRequests(true)
                          const response = await axios.post("/api/send-friend-request", { receiver: user });

                          if (response.status === 200) {
                            console.log(response.data);
                            friendRequestSentToast(response.data.message);
                          }
                        } catch (err) {
                          const error = err as AxiosError<{ message: string }>;

                          if (error.response?.status === 409) {
                            friendRequestSentToast("Friend request already sent or user already your friend");
                          } else {
                            console.error("Error sending friend request", error);
                            friendRequestSentToast("Something went wrong. Try again.");
                          }
                        }
                        setSendingFriendRequests(false)
                      }}
                    />}


                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Circle and Logout */}
        <div className="flex items-center gap-3">
          <button
            className="bg-white/10 px-3 py-1.5 rounded"
            onClick={async () => {
              await axios.get("/api/users/logout");
            }}
          >
            Logout
          </button>
          <div
            className="h-10 w-10 rounded-full bg-red-400 cursor-pointer"
            onClick={() => router.push("/main/profile")}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
