import React from 'react'
import ProfileDetailsPage from './@profile-details/page'
import ProfileCapsulesPart from './@profile-capsules-part/page'

export default function ProfilePage() {
  return (
    <div className='flex w-screen flex-col gap-5 p-5'>
      <ProfileDetailsPage/>
      <ProfileCapsulesPart/>
    </div>
  )
}
