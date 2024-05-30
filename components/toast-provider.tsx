'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  const { theme } = useTheme()

  return (
    <Toaster
      toastOptions={{
        style: {
          background: theme === 'dark' ? 'rgb(2 6 23)' : '#fff',
          color: theme === 'dark' ? 'rgb(248 250 252)' : 'rgb(2 6 23)',
          border:
            theme === 'dark'
              ? '1px solid  rgb(30 41 59)'
              : '1px solid rgb(226 232 240)',
          minWidth: '200px',
        },
        success: {
          iconTheme: {
            primary: theme === 'dark' ? 'black' : 'white',
            secondary: theme === 'dark' ? 'white' : 'black',
          },
        },
      }}
      position='bottom-right'
      containerStyle={{
        bottom: 50,
        right: 50,
      }}
    />
  )
}

export default ToastProvider
