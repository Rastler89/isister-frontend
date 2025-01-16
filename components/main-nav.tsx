import Link from "next/link";
import { cn } from "../libs/utils";
import { Home, PawPrint } from "lucide-react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    isAuthenticated: boolean;
}

export const MainNav = ({className,isAuthenticated,...props}:MainNavProps) => {
    return (
        <nav 
            className={cn('flex items-center space-x-4 lg:space-x-6',className)}
            {...props}>
                <Link
                    href='/'
                    className='flex items-center text-sm font-medium transition-colors hover:text-primary'
                >
                    <Home className='h-4 w-4 mr-2' />
                    Inicio
                </Link>
                {isAuthenticated && (
                    <>
                        <Link
                            href='/pets'
                            className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                        >
                            <PawPrint className='h-4 w-4 mr-2' />
                            Mascotas
                        </Link>
                    </>
                )}
            </nav>
    )
}