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
      <Table className='mt-8'>
        <TableCaption>A list of prepaid cards you sell.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Hours</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>{cardTypes?.hours_1}</TableCell>
            <TableCell>€{cardTypes?.price_1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{cardTypes?.hours_2}</TableCell>
            <TableCell>€{cardTypes?.price_2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{cardTypes?.hours_3}</TableCell>
            <TableCell>€{cardTypes?.price_3}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </>
  )
}

export default ProfilePage
