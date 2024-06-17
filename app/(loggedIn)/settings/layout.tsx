import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getOrganisation, getProfile } from './actions'
import Onboarding from './components/onboarding'
import SettingsMenu from './components/settings-menu'

const ProfilePage = async ({ children }: { children: React.ReactNode }) => {
  requireUser()
  const { data: userProfile } = await getProfile()
  const { data: organisation } = await getOrganisation()

  return (
    <>
      <Header title='Settings' crumbs={false} />
      <SettingsMenu />
      {!userProfile?.first_name ||
      !userProfile?.last_name ||
      !organisation?.name ? (
        <Onboarding userProfile={userProfile} organisation={organisation} />
      ) : null}

      <div className='mt-12'>{children}</div>
    </>
  )
}

export default ProfilePage
