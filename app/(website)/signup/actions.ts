'use server'

import { requireUser } from '@/utils/auth'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createFeedbackSchema } from './schema'

export const SignupWithOAuth = async (provider: 'google' | 'github') => {
  const supabase = createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/googlesignup`,
    },
  })

  return redirect(data.url!)
}

export const signUp = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect('/signup?message=Could not complete sign-up of user')
  }

  return redirect(
    '/login?message=Check your email to confirm your email address. You can sign in afterwards'
  )
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
