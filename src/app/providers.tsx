'use client'

import ToasterProvider from '@/components/ToasterProvider'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { darkTheme, lightTheme } from '../../theme'

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter()

  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <NextUIProvider className='light dark:dark bg-black' navigate={router.push}>
      <ToasterProvider>
        {children}
      </ToasterProvider>
    </NextUIProvider>
  )
}