'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? 'light' : theme

  const handleChange = useCallback(() => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }, [setTheme, theme])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button type='button' className='flex items-center' onClick={handleChange}>
      {currentTheme === 'dark' ? (
        <Sun size={18} className='hover:cursor-pointer ' />
      ) : (
        <Moon size={18} className='hover:cursor-pointer ' />
      )}
    </button>
  )
}

export default ThemeSwitcher
