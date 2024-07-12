'use server'

import { createFeedbackSchema } from '@/app/(public)/signup/schema'
import { createClient } from './supabase/server'
import { requireUser } from './auth'

export const getErrorMessage = (error: unknown) => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else {
    message = 'Something went wrong'
  }

  return message
}

export const verifyCaptcha = async (token: string | null) => {
  console.log(process.env.RECAPTCHA_SECRET_KEY_V3, 'hi???')
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY_V2_INV}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  const data = await response.json()

  if (data.success) {
    return 'success!'
  } else {
    throw new Error('Failed Captcha')
  }
}

export const createFeedback = async (prevData: any, formData: FormData) => {
  const validatedFields = createFeedbackSchema.safeParse({
    feedback: formData.get('feedback'),
  })

  if (!validatedFields.success) {
    console.log('validating error')
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createClient()

  const user = await requireUser()

  const { error } = await supabase.from('feedback').insert({
    user_id: user.id,
    email: user.email,
    feedback: validatedFields.data.feedback,
  })

  if (error) {
    return {
      status: 'error',
      message:
        'An error occurred while submittig the feedback, please try again.',
    }
  }

  return {
    status: 'success',
    message: 'Feedback submitted successfully',
  }
}
