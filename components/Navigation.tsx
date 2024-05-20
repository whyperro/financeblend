'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from 'react-use';
import { NavButton } from "./NavButton";
import { Button } from "./ui/button";


const routes = [
  {
    href: "/",
    label: "Dasboard"
  },
  {
    href: "/transactions",
    label: "Transacciones"
  },
  {
    href: "/accounts",
    label: "Cuentas"
  },
  {
    href: "/categories",
    label: "Categorias"
  },
  {
    href: "/settings",
    label: "Ajustes"
  },
]


const Navigation = () => {

  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false)
  
  const onClick = (href:string) => {
    router.push(href);
    setOpen(false);
  }

  console.log(isMobile)

  if(isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant={"outline"} className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition-all">
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {
              routes.map((route) => {
                return (
                  <Button className="w-full justify-start" variant={route.href === pathname ? "secondary" : 'ghost'} key={route.href} onClick={() => onClick(route.href)}>
                    {route.label}
                  </Button>
                )
              } )
            }
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {
        routes.map((route) => {
          return (
            <NavButton key={route.href} label={route.label} href={route.href} 
            isActive={pathname === route.href}
            />
          )
        })
      }
    </nav>
  )
}

export default Navigation