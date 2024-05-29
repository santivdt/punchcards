import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getProfile } from './actions'
import ProfileForm from './profile'

const ProfilePage = async () => {
  requireUser()

  const { data: userProfile } = await getProfile()

  return (
    <>
      <Header title='Settings' />
      <ProfileForm userProfile={userProfile}></ProfileForm>
    </>
  )
}

export default ProfilePage
