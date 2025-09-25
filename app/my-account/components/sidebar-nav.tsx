"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useClerk } from "@clerk/clerk-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()
  return (
   <nav className="text-white">
      <div className="md:hidden">
        <h3 className="bg-[#F57C00] text-white p-4 rounded-t-lg font-semibold">
          My Account
        </h3>
      </div>
      <nav
        className={cn(
          "flex w-full relative overflow-auto lg:flex-col bg-black border border-white rounded-lg",
          className
        )}
        {...props}
      >
        <div className="hidden md:block">
          <h3 className="bg-[#F57C00] text-white p-4 rounded-t-lg font-semibold">
            My Account
          </h3>
        </div>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-[#F57C00] text-white border-l-4 border-l-white"
                : "text-white hover:bg-[#F57C00] hover:text-white",
              "justify-start rounded-none border-b border-white/20 last:border-b-0"
            )}
          >
            {item.title}
          </Link>
        ))}
        <div>
          <Button 
            onClick={() => signOut(() => router.push('/'))} 
            variant={"ghost"} 
            className="justify-start hover:bg-[#EE6028] hover:text-white rounded-none w-full text-white border-t border-white/20"
          >
            Sign Out
          </Button>
        </div>
      </nav>
   </nav>
  )
}
