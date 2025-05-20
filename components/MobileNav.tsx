"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';


const MobileNav = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <div className="flex items-center justify-between pb-10 pl-4 pr-4">
            <Link href="/" className="flex cursor-pointer items-center gap-1">
              <Image 
                src="/images/Screenshot (305).png"
                width={100}
                height={100}
                alt="menu icon"
                className="rounded-full z-10 shadow-[0_0_8px_2px_#00FF7F,0_0_16px_4px_#00FF7F] border-4 border-[#00FF7F] bg-black/80"
              />
            </Link>
          </div>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map(({ route, label, imgURL }, idx) => {
                  const isActive = pathname === route || pathname.startsWith(`${route}/`);
                  const link = (
                    <SheetClose asChild key={route}>
                      <Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                        'bg-nav-focus border-r-4 border-orange-1': isActive
                      })}>
                        <Image src={imgURL} alt={label} width={24} height={24} />
                        <p>{label}</p>
                      </Link>
                    </SheetClose>
                  );
                  // Insert Sign in/out button just after 'Create Podcast' link
                  if (label === 'Create Podcast') {
                    return [
                      link,
                      <div key="sign-in-out" className="flex flex-col gap-2 px-2 pt-2">
                        <SignedOut>
                          <Link href="/sign-in" className="w-full">
                            <button className="w-full rounded-lg bg-orange-1 py-2 text-black-1 font-bold text-16 shadow-md hover:bg-orange-2 transition">Sign in</button>
                          </Link>
                        </SignedOut>
                        <SignedIn>
                          <button className="w-full rounded-lg bg-orange-1 py-2 text-black-1 font-bold text-16 shadow-md hover:bg-orange-2 transition" onClick={() => signOut()}>Sign out</button>
                        </SignedIn>
                      </div>
                    ];
                  }
                  return link;
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav