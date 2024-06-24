import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialState = null

export const formatDate = (date: string) => {
  const newDate = new Date(date)
  const day = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const year = newDate.getFullYear()

  return `${day}/${month}/${year}`
}

export const customFormatDuration = (duration: number) => {
  const hours = Math.floor(duration)
  const minutes = Math.round((duration - hours) * 60)
  return `${hours}h ${minutes}m`
}
