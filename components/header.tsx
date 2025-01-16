'use client'

import { useAuth } from "../providers/AuthProvider"
import { EntryNav } from "./entry-nav";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { UserNav } from "./user-nav";

export const Header = () => {
    const {user} = useAuth();

    const isAuthenticated = (user != null && user != undefined) ? true : false;

    return (
        <header className='sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
            <div className='container flex h-14 items-center max-w-7xl mx-auto px-4'>
                <MainNav className='hidden md:flex' isAuthenticated={isAuthenticated}/>
                <MobileNav className='md:hidden' isAuthenticated={isAuthenticated}/>
                <div className='flex flex-1 items-center justify-end space-x-4'>
                {isAuthenticated ? (
                        <UserNav />
                    ) : (
                        <EntryNav />
                    )}
                </div>

            </div>
        </header>
    )
}