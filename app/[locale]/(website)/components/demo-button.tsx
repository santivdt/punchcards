'use client'

import { demoSignIn } from '@/app/[locale]/(website)/login/actions'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const DemoButton = () => {
  const { t } = useTranslation()
  return (
    <Button
      size='xxl'
      variant='outline'
      className='rounded-full text-lg mt-2 md:mt-0'
      onClick={async (event) => {
        event.preventDefault()
        try {
          await demoSignIn()
        } catch (error) {
          console.error(error)
        }
      }}
    >
      {t('view-demo-button')}
    </Button>
  )
}

export default DemoButton
