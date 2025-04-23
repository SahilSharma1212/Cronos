import React from 'react';

export default function ProfileCapsulesPart() {
    return (
        <div className="flex flex-row items-start gap-6 p-4 bg-black/20 rounded-xl shadow-md w-full border border-fuchsia-300/50">

            {/* profile icon */}
            <div className="w-24 h-24 rounded-full bg-gray-300 text-black flex justify-center items-center">S</div>

            <div className="flex gap-8 h-24 items-center">

                {/* name */}
                <div>
                    <h2 className='opacity-75'>Name</h2>
                    <p className="text-lg font-semibold">John Doe</p>
                </div>

                {/* email */}
                <div>
                    <h2 className='opacity-75'>Email</h2>
                    <p className="text-lg font-semibold">email1212@email.com</p>
                </div>

                {/* account created at */}
                <div>
                    <h2 className='opacity-75'>Account created at</h2>
                    <p className="text-lg font-semibold">Date</p>
                </div>
                
            </div>
        </div>
    );
}
