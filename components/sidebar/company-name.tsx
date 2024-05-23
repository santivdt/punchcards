'use client'

import Link from 'next/link'
import { useState } from 'react'

const CompanyName = ({ userProfile: uP }) => {
  const [userProfile, setUserProfile] = useState(uP)
  return (
    <Link href='/profile'>
      {userProfile.data[0].company.length > 0
        ? userProfile.data[0].company
        : 'Hi there!'}
    </Link>
  )
}

export default CompanyName
