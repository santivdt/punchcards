'use client'

import { Button } from '@/components/ui/button'
import { Link } from 'nextjs13-progress'
import { useTranslation } from 'react-i18next'

const SignUpButton = () => {
  const { t } = useTranslation()
  return (
    <Button size='xxl' asChild className='rounded-full mr-4 text-lg'>
      <Link href='/signup'>{t('get-started-button')}</Link>
    </Button>
  )
}

export default SignUpButton
