'use client'

import { useState } from 'react'
import UpdateUserForm from './update'

const ProfileSection = ({ userData }) => {
  const [user, setUser] = useState(userData.data)

  return (
    <>
      <h3 className='mt-4'>
        Welcome {user[0].first_name} {user[0].last_name},
      </h3>
      <p>Manage clients and prepaid hours of {user[0].company} with ease!</p>
    </>
  )
}

export default ProfileSection
