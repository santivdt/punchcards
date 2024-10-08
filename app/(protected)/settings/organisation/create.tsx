'use client'

import { SubmitButton } from '@/app/(public)/login/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorType } from '@/types/custom-types'
import { initialState } from '@/utils'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { createOrganisation } from '../actions'

const CreateOrgnisationForm = () => {
  const [state, formAction] = useFormState(createOrganisation, initialState)
  const [preview, setPreview] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<ErrorType>(null)

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPreview(URL.createObjectURL(event.target.files[0]))
    }
  }

  // useEffect(() => {
  //   if (state?.status === 'success') {
  //     toast.success(state?.message || 'Organisation updated successfully')
  //   } else if (state?.status === 'error') {
  //     setErrorMessage(state?.message || 'Failed to update organisation')
  //   }
  // }, [state?.message, state?.status])

  return (
    <>
      <>
        <form action={formAction} className='my-4'>
          <div className='flex flex-col items-start mb-4'>
            <label className='flex items-center justify-center'>
              <input
                id='logo'
                name='logo'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleLogoChange}
              />
              <div className='relative inline-flex rounded-full'>
                <div className='flex cursor-pointer items-center justify-center rounded-full border border-dashed text-sm text-neutral-600 hover:border-neutral-300 dark:text-neutral-400 h-20 w-20'>
                  <span className='relative bg-white shadow-small dark:bg-black dark:shadow-white/20 w-20 h-20 text-2xl inline-flex flex-none cursor-pointer rounded-full object-cover'>
                    <Image
                      className='aspect-square h-full w-full rounded-[inherit] object-cover ring-inset ring-black/10'
                      alt='Logo'
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
          <div className='w-fit mt-4'>
            <Label htmlFor='name'>Organisation</Label>
            <Input id='name' name='name' type='text' />
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <SubmitButton pendingText='Updating...'>Update</SubmitButton>
          </div>
        </form>
      </>
    </>
  )
}

export default CreateOrgnisationForm
