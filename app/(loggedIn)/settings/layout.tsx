import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrganisation, getProfile } from './actions'
import Onboarding from './components/onboarding'
import SettingsMenu from './components/settings-menu'

const ProfilePage = async ({ children }: { children: React.ReactNode }) => {
  const [{ data: userProfile }, { data: organisation }] = await Promise.all([
    getProfile(),
    getOrganisation(),
  ])

  return (
    <div className='flex flex-col justify-center mx-auto w-full lg:w-1/2 pt-8'>
      {!userProfile?.first_name ||
      !userProfile?.last_name ||
      !organisation?.name ? (
        <Onboarding userProfile={userProfile} organisation={organisation} />
      ) : null}
      <Card className='w-content'>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsMenu />
          <div className='mt-12'>{children}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
