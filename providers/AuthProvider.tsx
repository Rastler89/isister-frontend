"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface User {
    id: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, name: string, password_confirmation: string) => Promise<void>
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
        try {
            const response = await fetch('http://localhost/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    client_id: '2',
                    client_secret: 'c1QmHMdGqmxyl7Gv2UlWdlqRgyTLT3UJ1uI0jtr6',
                    grant_type: 'password'
                })
            })

            if(!response.ok) {
                throw new Error('Invalid login credentials')
            }

            const data = await response.json()

            localStorage.setItem('access_token',data.access_token)
            localStorage.setItem('refresh_token',data.refresh_token)
            
            const decodedToken:any = jwtDecode(data.access_token)

            console.log(decodedToken)

            const user = {
                id: decodedToken.sub,
                email,
                name: decodedToken.name
            }

            localStorage.setItem('user',JSON.stringify(user))
            setUser(user)

            router.push('/pets')
        } catch(error) {
            console.error('Login failed: ', error)
        }
    }

    const register = async (email: string, password: string, name: string, password_confirmation: string) => {
        try {
            const response = await fetch('http://localhost/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                    json: 'true'
                })
            })

            if (!response.ok) {
                throw new Error('Registration failed')
            }

            const data = await response.json()

            router.push('/auth/login')
        } catch(error) {
            console.error('Registration failed: ',error)
        }
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