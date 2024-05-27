import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getCardTypes, getProfile } from './actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileForm from './profile'
import CardTypeForm from './card-types'

const ProfilePage = async () => {
  requireUser()

  const { data: userProfile } = await getProfile()
  const { data: cardTypes } = await getCardTypes()

  return (
    <>
      <Header title='Settings'></Header>
      {/* //TODO deze tabs geven hydrate error */}
      <Tabs defaultValue='profile' className='my-4 mx-1'>
        <TabsList>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='card-types'>Card types</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <ProfileForm userProfile={userProfile} />
        </TabsContent>
        <TabsContent value='card-types'>
          <CardTypeForm cardTypes={cardTypes} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ProfilePage
