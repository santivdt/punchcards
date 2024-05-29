'use client'

import SubmitButton from '@/components/submitbutton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tables } from '@/types/supabase'
import { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'
import { updateProfile } from './actions'

const initialState = undefined

type ProfileFormProps = {
  userProfile: Tables<'profiles'> | null
}

const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateProfile, initialState)

  useEffect(() => {
    if (state?.status === 'success') {
      formRef.current?.reset()
    }
  }, [state?.status])

  return (
    <>
      {userProfile && (
        <>
          <form action={formAction} className='my-4 mx-1'>
            <input type='hidden' name='id' defaultValue={userProfile.id} />
            <div className='flex'>
              <div className='mr-8'>
                <Label htmlFor='first_name'>First name</Label>
                <Input
                  id='first_name'
                  name='first_name'
                  type='text'
                  defaultValue={userProfile.first_name ?? ''}
                />
                {state?.errors?.first_name && (
                  <p className='py-2 text-xs text-red-500'>
                    {state.errors.first_name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='last_name'>Last name</Label>
                <Input
                  id='last_name'
                  name='last_name'
                  type='text'
                  defaultValue={userProfile.last_name ?? ''}
                />
                {state?.errors?.last_name && (
                  <p className='py-2 text-xs text-red-500'>
                    {state.errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div className='w-1/2 mt-4'>
              <Label htmlFor='company'>Company</Label>
              <Input
                id='company'
                name='company'
                type='text'
                defaultValue={userProfile.company ?? ''}
              />
              {state?.errors?.company && (
                <p className='py-2 text-xs text-red-500'>
                  {state.errors.company}
                </p>
              )}
            </div>
            <p aria-live='polite' className='sr-only'>
              {state?.message}
            </p>
            <div className='flex items-center gap-2 mt-4'>
              <SubmitButton normal='Update' going='Updating...' />
            </div>
          </form>
          {/* //TODO make delete user work */}
          {/* (https://github.com/orgs/supabase/discussions/1066) */}

          {/* <h2 className='mt-16 text-lg font-bold text-red-500'>Danger zone</h2>
          <Separator className='w-1/2 mt-2' />
          <p className='mt-2 w-1/2'>
            Deleting your account wil delete all of your clients, cards and
            hours. This action cannot be undone.
          </p>
          <DeleteUserDialog open={deleteDialogOpen} user={userProfile}>
            <Button
              variant='destructive'
              className='mt-2'
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete account
            </Button>
          </DeleteUserDialog> */}
        </>
      )}
    </>
  )
}

export default ProfileForm
