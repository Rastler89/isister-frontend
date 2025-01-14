"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
    id: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const publicRoutes = ['/', '/about', '/contact', '/products']; // Agrega las rutas públicas aquí
    
        if (storedUser) {
            setUser(JSON.parse(storedUser))

        } else if (!pathname.includes('/auth') && !publicRoutes.includes(pathname)) { 
            router.push('/auth/login')
        }
    }, [pathname, router])

    const login = async (email:string, password: string) => {
        await new Promise(resolve => setTimeout(resolve,1000))

        //TODO: validate user
        const mockUser = {
            id: "1",
            email,
            name: "Usuario Demo"
          }
          
          localStorage.setItem("user", JSON.stringify(mockUser))
          setUser(mockUser)
          router.push("/")
    }

    const register = async (email: string, password: string, name: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, create user in your backend
        const mockUser = {
          id: "1",
          email,
          name
        }
        
        localStorage.setItem("user", JSON.stringify(mockUser))
        setUser(mockUser)
        router.push("/")
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}