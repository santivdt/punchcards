import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import SettingsMenu from './components/settings-menu'

const ProfilePage = async ({ children }: { children: React.ReactNode }) => {
  requireUser()

  return (
    <>
      <Header title='Settings' crumbs={false} />
      <SettingsMenu />
      {children}
    </>
  )
}

export default ProfilePage
