'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
export const EntryNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button onClick={toggleDropdown} variant='ghost' className='relative rounded-full'>
                    Acceso
                    <ChevronDown 
                         className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-28' align='end' forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href='/auth/login'>
                            Login
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/auth/register'>
                            Registro
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}