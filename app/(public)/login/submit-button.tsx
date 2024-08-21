'use client'

import { type ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/utils'

type Props = ComponentProps<'button'> & {
  pendingText?: string
  variant?: 'primary' | 'secondary'
}

export function SubmitButton({
  children,
  pendingText,
  variant = 'primary',
  ...props
}: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <button
      {...props}
      type='submit'
      aria-disabled={pending}
      className={cn(
        'px-4 py-2 rounded focus:outline-none hover:transform transform transition-transform duration-200 hover:scale-105 text-sm',
        variant === 'primary' &&
          'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200',
        variant === 'secondary' &&
          'dark:bg-black dark:border-white dark:text-white bg-white text-black border-gray-200 border',
        props.className
      )}
    >
      {isPending ? pendingText : children}
    </button>
  )
}
