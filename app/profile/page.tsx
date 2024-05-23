import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getProfile } from './actions'
import ProfileSection from './profile-section'
import UpdateProfileDialog from './update'
import { Button } from '@/components/ui/button'

const ProfilePage = async () => {
  const user = await requireUser()

  const userData = await getProfile(user.id)

  return (
    <>
      <Header title='Profile'>
        <UpdateProfileDialog user={userData.data[0]}>
          <Button>Edit profile</Button>
        </UpdateProfileDialog>
      </Header>
      <ProfileSection userData={userData} />
    </>
  )
}

export default ProfilePage
