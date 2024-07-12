'use client'

import { useCallback, useState } from 'react'
import ForgotPasswordForm from './forgot-form'

const InterMediateForgotForm = () => {
  const [formKey, setFormKey] = useState(0)
  const resetForm = useCallback(
    () => setFormKey((prevState) => prevState + 1),
    []
  )

  return <ForgotPasswordForm key={formKey} onFinished={resetForm} />
}

export default InterMediateForgotForm
