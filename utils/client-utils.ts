import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1900,
    height: typeof window !== 'undefined' ? window.innerHeight : 2000,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
