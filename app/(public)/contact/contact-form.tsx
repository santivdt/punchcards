'use client'
import { useFormState } from 'react-dom'
import SubmitButton from '../../(protected)/components/submitbutton'
import { sendMessage } from './actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'
import { verifyCaptcha } from '@/utils/server-utils'

const ContactForm = () => {
  const [state, formAction] = useFormState(sendMessage, null)
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsverified] = useState<boolean>(false)

  const handleCaptchaSubmission = async (token: string | null) => {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }

  useEffect(() => {
    if (state && state.message && state.status === 'success') {
      toast.success(state.message)
      formRef?.current?.reset()
    } else if (state && state.message && state.status === 'error') {
      toast.success(state.message)
    }
  }, [state, formAction])

  return (
    <form ref={formRef} action={formAction}>
      <Label htmlFor='email'>Email</Label>
      <Input
        name='email'
        id='email'
        type='email'
        placeholder='jane@janedoe.com'
        className='mb-4 border'
        required
      />
      <Label htmlFor='message'>Message</Label>
      <Textarea
        name='message'
        id='message'
        placeholder='Type your message here'
        className='mb-4 border'
        required
      />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2_INV!}
        onChange={handleCaptchaSubmission}
        className='mb-4'
      />
      <SubmitButton going='Sending..' normal='Send' disabled={!isVerified} />
    </form>
  )
}

export default ContactForm
