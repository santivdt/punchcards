import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { updateProfile } from '../actions'
import DeleteUserDialog from '../delete'

type DangerZoneProps = {
  userProfile: Tables<'profiles'> | null
}

const initialState = undefined

const DangerZone = ({ userProfile }: DangerZoneProps) => {
  const [state, formAction] = useFormState(updateProfile, initialState)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dialogKey, setDialogKey] = useState(0)
  const resetDialog = useCallback(
    () => setDialogKey((prevState) => prevState + 1),
    []
  )

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success('Profile updated successfully')
    }
  }, [state?.message, state?.status])
  return (
    <>
      {userProfile && (
        <>
          <h2 className='mt-16 text-lg font-bold text-red-500'>Danger zone</h2>
          <Separator className='w-1/2 mt-2' />
          <p className='mt-2 pb-2 w-4/5 text-balance'>
            Deleting your account wil delete all of your clients, cards and
            hours. This action cannot be undone.
          </p>
          <DeleteUserDialog
            open={deleteDialogOpen}
            userId={userProfile.id}
            setDeleteDialogOpen={setDeleteDialogOpen}
            key={dialogKey}
            onFinished={resetDialog}
          >
            <Button
              variant='destructive'
              className='mt-2'
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 size={14} className='mr-2' />
              Delete account
            </Button>
          </DeleteUserDialog>
        </>
      )}
    </>
  )
}

export default DangerZone
