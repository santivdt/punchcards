'use client'

import FormError from '@/components/form-error'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { uploadProfilePicture } from '../actions'

const initialState = undefined

type ProfilePictureProps = {
  avatar: string | null
}

const ProfilePicture = ({ avatar }: ProfilePictureProps) => {
  const [formState, formAction] = useFormState(
    uploadProfilePicture,
    initialState
  )

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handling file change')
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handling submit')
    event.preventDefault()
    if (selectedFile) {
      const formData = new FormData()
      formData.append('profile_picture', selectedFile)
      uploadProfilePicture(undefined, formData)
    }
  }

  useEffect(() => {
    if (formState?.status === 'error') {
      setErrorMessage(formState.message)
    }
    if (formState?.status === 'success') {
      setErrorMessage(undefined)
      toast.success(formState.message)
    }
  }, [formState?.status, formState?.message])

  // const { pending } = useFormStatus()

  return (
    <>
      {/* {pending ? <p className='text-white'>PENDING!!!</p> : <p>not pending</p>} */}
      <form onSubmit={handleSubmit} className='my-4 flex'>
        <div className='flex flex-col items-start'>
          <label className='flex items-center justify-center'>
            <input
              id='photo'
              name='photo'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
            <div className='relative inline-flex rounded-full'>
              <div className='flex cursor-pointer items-center justify-center rounded-full border border-dashed text-sm text-neutral-600 hover:border-neutral-300 dark:text-neutral-400 h-20 w-20'>
                <span className='relative bg-white shadow-small dark:bg-black dark:shadow-white/20 w-20 h-20 text-2xl inline-flex flex-none cursor-pointer rounded-full object-cover'>
                  <Image
                    className='aspect-square h-full w-full rounded-[inherit] object-cover ring-inset ring-black/10'
                    alt='Profile picture'
                    src={avatar || '/placeholder.jpeg'}
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
        <FormError errorMessage={errorMessage} />
      </form>
    </>
  )
}

export default ProfilePicture
