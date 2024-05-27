import Header from '@/components/header'
import { requireUser } from '@/utils/auth'
import { getCardTypes, getProfile } from './actions'
import UpdateProfileDialog from './update'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CreateCardTypeDialog from './card-types/create'

const ProfilePage = async () => {
  requireUser()

  const { data: userProfile } = await getProfile()
  const { data: cardTypes } = await getCardTypes()

  return (
    <>
      {/* TODO can only click edit profile once */}
      <Header title='Profile'>
        <UpdateProfileDialog user={userProfile}>
          <Button>Edit profile</Button>
        </UpdateProfileDialog>
      </Header>

      <h3 className='mt-4'>
        {userProfile?.first_name ? (
          <>
            Welcome {userProfile.first_name} {userProfile.last_name},
          </>
        ) : (
          <>
            <h3 className='mt-4'>
              Welcome, please add your information by clicking the edit profile
              button.
            </h3>
          </>
        )}
        {/* //TODO here je auth email */}
      </h3>
      <CreateCardTypeDialog>
        <Button>Add card type </Button>
      </CreateCardTypeDialog>
      <Table className='mt-8'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Hours</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
          {cardTypes?.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.hours}</TableCell>
              <TableCell>€{card.price}</TableCell>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </>
  )
}

export default ProfilePage
