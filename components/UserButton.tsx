'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowPathIcon,
    ArrowRightEndOnRectangleIcon,
    UserIcon,
} from '@heroicons/react/24/solid'
import { Button } from './ui/button'
import { UserCircleIcon } from 'lucide-react'
import { ClockHistory, ChevronDown, ChevronUp } from 'react-bootstrap-icons'
import { cn } from '@/lib/utils'


// Desktop dropdown menu (unchanged, for desktop use)
const UserButtonAndMenu: React.FC<{ className?: string }> = ({ className }) => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const label = user?.firstName ? user.firstName : 'Profile';
    const fullname = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Profile';
    const email = user?.emailAddresses ? `${user.emailAddresses}` : 'Email Addresses';

    return (
        <div className={cn("", className)}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <div className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer bg-gradient-to-br from-[#FFF6ED] via-[#FFD7A0] to-[#FFB86C] text-[#D44C02]  shadow-md backdrop-blur-[2px] hover:scale-105 hover:shadow-lg hover:bg-[#FFF3E0]/80 transition-all duration-200">
                        {user?.hasImage ? (
                            <Image
                                alt={label ? label : 'Profile image'}
                                src={user?.imageUrl}
                                width={40}
                                height={40}
                                className="rounded-full border border-white shadow w-full h-full object-cover"
                            />
                        ) : (
                                <UserIcon className="h-10 w-10 text-[#D44C02]" />
                        )}
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className={cn(
                        "mt-3 w-[20rem] z-[99999] rounded-2xl border border-white/30 bg-black py-6 text-white shadow-md absolute -right-2 -top-2 ",
                        className
                    )}>
                        <DropdownMenu.Label />
                        <DropdownMenu.Group>
                            <DropdownMenu.Item asChild className="outline-none">
                                <div className='flex gap-4 px-6 py-4 items-center bg-transparent rounded-xl '>
                                    <div className='flex items-center justify-center rounded-full w-12 h-12 bg-white/10 border border-white/30'>
                                        {user?.hasImage ? (
                                            <Image
                                                alt={label ? label : 'Profile image'}
                                                src={user?.imageUrl}
                                                width={40}
                                                height={40}
                                                className="rounded-full border border-white w-full h-full object-cover"
                                            />
                                        ) : (
                                            <UserIcon className="h-7 w-7 text-white" />
                                        )}
                                    </div>
                                    <div className="flex flex-col text-sm text-white font-plus-jakarta-sans">
                                        <p className="text-base font-bold">{fullname}</p>
                                        <p className="truncate max-w-[10rem] text-white/80">{email}</p>
                                    </div>
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="my-6" />
                           <div className='px-4 flex flex-col gap-4'>
                                <DropdownMenu.Item asChild className="outline-none">
                                    <Link href="/my-account" passHref>
                                        <Button className="w-full justify-start  px-6 py-3 text-white bg-transparent border border-white/20 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans rounded-lg text-base font-semibold transition-all" variant={"ghost"}>
                                            <UserCircleIcon className="mr-2 h-5 w-auto text-white" />
                                            Profile
                                        </Button>
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild className="outline-none">
                                    <Link href="/my-account/history" passHref>
                                        <Button className="w-full justify-start px-6 py-3 text-white bg-transparent border border-white/20 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans rounded-lg text-base font-semibold transition-all" variant={"ghost"}>
                                            <ClockHistory className="mr-2 h-5 w-auto text-white" />
                                            History
                                        </Button>
                                    </Link>
                                </DropdownMenu.Item>
                           </div>
                        </DropdownMenu.Group>
                        <DropdownMenu.Separator className="my-4" />
                       <div className='px-4'>
                            <DropdownMenu.Item asChild className="outline-none px-6 ">
                                <Button onClick={() => signOut(() => router.push('/'))} className="w-full justify-start py-3 text-white bg-transparent border border-white/20 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans rounded-lg text-base font-semibold transition-all" variant={"ghost"}>
                                    <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-auto text-white" /> Sign Out
                                </Button>
                            </DropdownMenu.Item>
                       </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};

// // Mobile: just show name and menu (no dropdown)
// export const UserMenuMobile: React.FC<{ className?: string }> = ({ className }) => {
//     const { user } = useUser();
//     const { signOut } = useClerk();
//     const router = useRouter();
//     const fullname = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Profile';
//     const email = user?.emailAddresses ? `${user.emailAddresses}` : 'Email Addresses';
//     const [showMenu, setShowMenu] = React.useState(false);

//     // Hide menu when clicking outside
//     const menuRef = React.useRef<HTMLDivElement>(null);
//     React.useEffect(() => {
//         if (!showMenu) return;
//         function handleClick(e: MouseEvent) {
//             if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//                 setShowMenu(false);
//             }
//         }
//         document.addEventListener('mousedown', handleClick);
//         return () => document.removeEventListener('mousedown', handleClick);
//     }, [showMenu]);

//     return (
//         <div className={cn("block lg:hidden w-full", className)}>
//             <button
//                 className="flex gap-3 items-center px-3 py-3 w-full bg-black border border-white/20 rounded-2xl"
//                 onClick={() => setShowMenu((v) => !v)}
//                 aria-expanded={showMenu}
//                 aria-controls="user-mobile-menu"
//             >
//                 <div className="flex items-center justify-center rounded-full w-14 h-14 bg-white/10 border border-white/20">
//                     {user?.hasImage ? (
//                         <Image
//                             alt={fullname}
//                             src={user?.imageUrl}
//                             width={44}
//                             height={44}
//                             className="rounded-full border border-white w-full h-full object-cover"
//                         />
//                     ) : (
//                         <UserIcon className="h-8 w-8 text-white" />
//                     )}
//                 </div>
//                 <div className="flex flex-col text-xs text-white font-plus-jakarta-sans text-left">
//                     <p className="text-base font-bold">{fullname}</p>
//                     <p className="truncate max-w-[11rem] text-white/80">{email}</p>
//                 </div>
//                 <span className="ml-auto text-white text-xl flex items-center">
//                     {showMenu ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
//                 </span>
//             </button>
//             <div
//                 id="user-mobile-menu"
//                 ref={menuRef}
//                 className={
//                     `overflow-hidden transition-all duration-300 ease-in-out transform ${
//                         showMenu
//                             ? 'max-h-60 opacity-100 scale-100 mt-2'
//                             : 'max-h-0 opacity-0 scale-95 pointer-events-none'
//                     } flex flex-col gap-2 px-2 bg-black border border-white/20 rounded-2xl`
//                 }
//                 style={{ willChange: 'opacity, transform, max-height' }}
//             >
//                 <Link href="/my-account" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white bg-transparent border border-white/10 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans text-base transition-all">
//                     <UserCircleIcon className="h-5 w-auto" /> Profile
//                 </Link>
//                 <Link href="/my-account/history" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white bg-transparent border border-white/10 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans text-base transition-all">
//                     <ClockHistory className="h-5 w-auto" /> History
//                 </Link>
//                 <button onClick={() => { setShowMenu(false); signOut(() => router.push('/')); }} className="flex items-center gap-2 px-4 py-3 rounded-xl text-white bg-transparent border border-white/10 hover:bg-[#D44C02] hover:text-white font-plus-jakarta-sans text-base transition-all">
//                     <ArrowRightEndOnRectangleIcon className="h-5 w-auto" /> Sign Out
//                 </button>
//             </div>
//         </div>
//     );
// };

interface UserButtonProps {
    path?: string;
    className?: string;
}
export const UserButton: React.FC<UserButtonProps> = ({ path, className }) => {
    const { isLoaded, user } = useUser();
    const { openSignIn } = useClerk();

    if (!isLoaded)
        return (
            <Button
                onClick={() => openSignIn()}
                className={cn(
                    "bg-[#F57C00] hover:bg-[#EE6028] text-white border border-white px-6 py-2 rounded-lg font-semibold transition-all",
                    className
                )}
            >
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
            </Button>
        );

    if (!user?.id)
        return (
            <Button
                type="button"
                onClick={() =>
                    openSignIn({
                        afterSignInUrl: path,
                    })
                }
                className={cn(
                    "bg-[#F57C00] hover:bg-[#EE6028] text-white border border-white px-6 py-2 rounded-lg font-semibold transition-all",
                    className
                )}
            >
                Sign In
            </Button>
        );

    // Desktop: dropdown, Mobile: just show menu
    return <>
        <UserButtonAndMenu className={className} />
        {/* <UserMenuMobile className={className} /> */}
    </>;
};