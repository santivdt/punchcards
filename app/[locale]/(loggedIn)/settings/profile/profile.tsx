'use client'

import SubmitButton from '@/app/[locale]/(loggedIn)/components/submitbutton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tables } from '@/types/supabase'
import { initialState } from '@/utils'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { updateProfile } from '../actions'
import DangerZone from '../components/dangerzone'

type ProfileFormProps = {
  userProfile: Tables<'profiles'> | null
}

const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const [state, formAction] = useFormState(updateProfile, initialState)
  const [preview, setPreview] = useState<string | null>(
    userProfile?.avatar || null
  )

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPreview(URL.createObjectURL(event.target.files[0]))
    }
  }

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state?.message || 'Profile updated successfully')
    }
  }, [state?.message, state?.status])

  return (
    <>
      {userProfile && (
        <>
          <form action={formAction} className='my-4'>
            <input type='hidden' name='id' defaultValue={userProfile.id} />
            <div className='flex flex-col items-start mb-4'>
              <label className='flex items-center justify-center'>
                <input
                  id='avatar'
                  name='avatar'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handlePhotoChange}
                />
                <div className='relative inline-flex rounded-full'>
                  <div className='flex cursor-pointer items-center justify-center rounded-full border border-dashed text-sm text-neutral-600 hover:border-neutral-300 dark:text-neutral-400 h-20 w-20'>
                    <span className='relative bg-white shadow-small dark:bg-black dark:shadow-white/20 w-20 h-20 text-2xl inline-flex flex-none cursor-pointer rounded-full object-cover'>
                      <Image
                        className='aspect-square h-full w-full rounded-[inherit] object-cover ring-inset ring-black/10'
                        alt='Profile picture'
                        src={preview || '/placeholder.jpeg'}
                        width='80'
                        height='80'
                        priority
                      />
                    </span>
                  </div>
                  <div className='absolute bottom-0 right-0 flex translate-y-0 cursor-pointer items-center justify-center rounded-full bg-neutral-50 p-2 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-neutral-800'>
                    <Pencil size={12} />
                  </div>
                </div>
              </label>
            </div>
            <div className='flex'>
              <div className='mr-8'>
                <Label htmlFor='first_name'>First name</Label>
                <Input
                  id='first_name'
                  name='first_name'
                  type='text'
                  defaultValue={userProfile.first_name || ''}
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
                  defaultValue={userProfile.last_name || ''}
                />
                {state?.errors?.last_name && (
                  <p className='py-2 text-xs text-red-500'>
                    {state.errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <p aria-live='polite' className='sr-only'>
              {state?.message}
            </p>
            <div className='flex items-center gap-2 mt-4'>
              <SubmitButton normal='Update' going='Updating...' />
            </div>
          </form>

          <DangerZone userProfile={userProfile} />
        </>
      )}
    </>
  )
}

export default ProfileForm
