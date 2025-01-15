import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

interface MobileNavProps extends React.HTMLAttributes<HTMLElement> {
    isAuthenticated: boolean;
}

export const MobileNav = ({className,isAuthenticated}:MobileNavProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className={className}>
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
                    <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <div className='flex flex-col space-y-4 mt-4'>
                    <Link
                        href='/'
                        className='text-sm font-medium transition-colors hover:text-primary'
                    >Inicio</Link>
                    {isAuthenticated && (
                    <>
                        <Link
                            href='/pets'
                            className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                        >
                            Mascotas
                        </Link>
                    </>
                )}
                </div>
            </SheetContent>
        </Sheet>
    )
}