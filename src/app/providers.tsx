'use client'

import ToasterProvider from '@/components/ToasterProvider'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      <ToasterProvider>
        {children}
      </ToasterProvider>
    </NextUIProvider>
  )
}