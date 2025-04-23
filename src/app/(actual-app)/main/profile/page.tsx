import React from 'react'
import ProfileDetailsPage from './components/ProfileDetailsPart'
import ProfileCapsulesPart from './components/ProfileCapsulesPart'

export default function ProfilePage() {
  return (
    <div className='flex w-screen flex-col gap-5 p-5'>
      <ProfileDetailsPage/>
      <ProfileCapsulesPart/>
    </div>
  )
}
