"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { authService, LoginResponse } from "../services/authServices"
import { useToast } from "../hooks/useToast"

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
    const { toast } = useToast()
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const publicRoutes = ['/', '/about', '/contact', '/products']; // Agrega las rutas públicas aquí
    
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            if(!isTokenValid(localStorage.getItem('access_token'))) {
                refresh()
            }
        } else if (!pathname.includes('/auth') && !publicRoutes.includes(pathname)) { 
            router.push('/auth/login')
        }
    }, [pathname, router])

    const isTokenValid = (token:string | null):boolean => {
        if(!token) return false

        try {
            const payloadBase64 = token.split('.')[1]
            const payloadDecoded = JSON.parse(atob(payloadBase64))
            const expiration = payloadDecoded.exp

            if(!expiration) return false

            const currentTime = Math.floor(Date.now() / 1000)
            return expiration > currentTime //
        } catch(error) {
            console.error('error al decodificar el token: ',error)
            return false
        }
    }

    const refresh = async () => {
        const refresh = localStorage.getItem('refresh_token')

        if(!refresh) return
        
        try {
            const data: LoginResponse = await authService.refresh(refresh)

            if(!data) return

            createUser(data)
        } catch(error) {
            logout()
        }

    }

    const login = async (email:string, password: string) => {
        try {
            const data: LoginResponse = await authService.login(email, password)

            if(!data) return
            toast({
                title: '¡Bienvenido de nuevo!',
                description: 'Has iniciado sesión correctamente',
                variant: 'success'
            })

            createUser(data)
            router.push('/pets')
        } catch(error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Credenciales incorrectas. Por favor, inténtalo de nuevo'
              })
        }
    }

    const createUser = (data: LoginResponse) => {
        localStorage.setItem('access_token',data.access_token )
        localStorage.setItem('refresh_token',data.refresh_token)
        
        const decodedToken:any = jwtDecode(data.access_token)

        const user = {
            id: decodedToken.sub,
            email: data.user.email,
            name: data.user.name
        }

        localStorage.setItem('user',JSON.stringify(user))
        //setUser(user)
        //router.push('/pets')
    }

    const register = async (email: string, password: string, name: string, password_confirmation: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
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