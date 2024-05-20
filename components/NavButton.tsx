import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'


interface NavButtonProps {
  label: string,
  href: string,
  isActive: boolean,
}

export const NavButton = ({label, href, isActive}: NavButtonProps) => {
  return (
    <Button className={cn(
      "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition-all",
      isActive ? "bg-white/10 text-white" : 'bg-transparent'
    )} asChild size={'sm'} variant={'outline'}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
