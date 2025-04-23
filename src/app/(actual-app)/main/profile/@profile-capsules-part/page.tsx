"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CronosCapsulesResponseInterface } from '@/types/ApiResponse'
import { Loader2 } from "lucide-react"
import Link from 'next/link'


export default function ProfileCapsulesPart() {

  const [capsules, setCapsules] = useState<CronosCapsulesResponseInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await axios.post("/api/capsule-operations/get-capsules")

        if (response.data) {
          setCapsules(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch capsules", error)
      } finally {
        setLoading(false) // turn off loader
      }
    }

    fetchCapsules()
  }, [])


  capsules.forEach((capsule) => {
    console.log(capsule.capsuleName)
  })

  return (
    <div className='flex justify-between'>

      {/* public capsules */}
      <div className="flex flex-col items-center gap-6 p-4 bg-black/20 rounded-xl shadow-md w-[720px] border border-fuchsia-300/50 h-96">
        <p>Private</p>
        <hr className="w-full h-[1px] border-0 bg-gradient-to-r from-fuchsia-300/5 via-fuchsia-300/75 to-fuchsia-300/5" />

        <div className="capsulebox flex flex-col items-center justify-center h-full w-full">
        {
            loading ? (
              <Loader2 className="animate-spin text-fuchsia-300 w-8 h-8" />
            ) : (
              capsules.filter(capsule => capsule.privacyType === "private").length === 0 ? (
                <p className="text-sm text-white/60">No capsules</p>
              ) : (
                capsules
                  .filter(capsule => capsule.privacyType === "private")
                  .map(capsule => (
                    <Link href={`/main/view-capsules?capsuleID=${capsule._id}`} key={capsule._id} className='text-lg text-white font-bold'>{capsule.capsuleName}</Link>
                  ))
              )
            )
          }
        </div>
      </div>

      {/* private capsules */}
      <div className="flex flex-col items-center gap-6 p-4 bg-black/20 rounded-xl shadow-md w-[720px] border border-fuchsia-300/50 h-96">
        <p>Public</p>
        <hr className="w-full h-[1px] border-0 bg-gradient-to-r from-fuchsia-300/5 via-fuchsia-300/75 to-fuchsia-300/5" />

        <div className="capsulebox flex flex-col items-center justify-center h-full w-full">
          {
            loading ? (
              <Loader2 className="animate-spin text-fuchsia-300 w-8 h-8" />
            ) : (
              capsules.filter(capsule => capsule.privacyType === "public").length === 0 ? (
                <p className="text-sm text-white/60">No capsules</p>
              ) : (
                capsules
                  .filter(capsule => capsule.privacyType === "public")
                  .map(capsule => (
                    <p key={capsule._id} className='text-lg text-white font-bold'>{capsule.capsuleName}</p>
                  ))
              )
            )
          }
        </div>
      </div>
    </div>
  )
}
