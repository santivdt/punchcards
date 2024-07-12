import { getProfile } from '../actions'
import ProfileForm from './profile'

const ProfilePage = async () => {
  const { data: userProfile } = await getProfile()

  return <ProfileForm userProfile={userProfile}></ProfileForm>
}

export default ProfilePage
