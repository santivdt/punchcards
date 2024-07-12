'use server'
import { EmailTemplate } from './email-template'
import { Resend } from 'resend'
import { messageSchema } from './schema'

const resend = new Resend(process.env.RESEND_API_KEY)!

export const sendMessage = async (prevData: any, formData: FormData) => {
  const validatedFields = messageSchema.safeParse({
    message: formData.get('message'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { data, error } = await resend.emails.send({
    from: 'team@punchit.work',
    to: 'resend2@privacysvp.com',
    subject: 'Contact form Punch it',
    react: EmailTemplate({
      email: validatedFields.data.email,
      message: validatedFields.data.message,
    }),
  })

  if (error) {
    console.error(error)
    return { status: 'error', message: 'Failed to send message' }
  }

  return {
    status: 'success',
    message: 'Message sent successfully',
  }
}
