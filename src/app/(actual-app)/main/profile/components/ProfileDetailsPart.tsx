'use client';
import axios from 'axios';
import { User2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export type tokenData = {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
};

export default function ProfileCapsulesPart() {
    const [userdetails, setUserdetails] = useState<tokenData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/users/get-user-from-token", {
                    withCredentials: true, // 🔥 Ensure cookies are sent
                });

                if (response.data?.user) {
                    setUserdetails(response.data.user);
                    console.log("✅ User data:", response.data.user);
                } else {
                    console.warn("⚠️ No user data found in response:", response.data);
                }
            } catch (error) {
                console.error("❌ Failed to fetch user data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const formattedDate = userdetails?.createdAt
        ? new Date(userdetails.createdAt).toLocaleDateString()
        : 'N/A';

    return (
        <div className="flex flex-row items-start gap-6 p-4 bg-black/20 rounded-xl shadow-md w-full border border-fuchsia-300/50">
            {/* profile icon */}
            <div className="w-24 h-24 rounded-full bg-gray-300 text-black flex justify-center items-center">
                {isLoading ? '...' : <User2 size={50}/>}
            </div>

            <div className="flex gap-8 h-24 items-center">

                {/* username */}
                <div>
                    <h2 className='opacity-75'>Username</h2>
                    <p className="text-lg font-semibold">
                        {isLoading ? 'Loading...' : (userdetails?.username || 'Not found')}
                    </p>
                </div>


                {/* email */}
                <div>
                    <h2 className='opacity-75'>Email</h2>
                    <p className="text-lg font-semibold">
                        {isLoading ? 'Loading...' : (userdetails?.email || 'no-email')}
                    </p>
                </div>

                {/* account created at */}
                <div>
                    <h2 className='opacity-75'>Account created at</h2>
                    <p className="text-lg font-semibold">
                        {isLoading ? 'Loading...' : formattedDate}
                    </p>
                </div>
            </div>
        </div>
    );
}
