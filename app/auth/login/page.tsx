'use client'

import { useState } from "react"
import { useAuth } from "../../../providers/AuthProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Dog } from "lucide-react"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PasswordInput } from "../../../components/password-input"

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()


    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)


        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            await login(email, password)
        } catch(error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className='border-green-100'>
            <CardHeader className='space-y-1'>
                <div className='flex justify-center mb-4'>
                    <div className='bg-green-100 p-3 rounded-full'>
                        <Dog className='w-6 h-6 text-green-600' />
                    </div>
                </div>
                <CardTitle className='text-2xl text-center'>Bienvenido de nuevo</CardTitle>
                <CardDescription className='text-center'>
                    Introduce tus credenciales para acceder
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='nombre@ejemplo'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Contraseña</Label>
                        <PasswordInput id="password" name="password" required disabled={isLoading} showStrength={false} />
                    </div>
                    <Button
                        type='submit'
                        className='w-full bg-green-600 hover:bg-green-700'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </form>
                <div className='mt-4 text-center text-sm'>
                    ¿No tienes una cuenta?{" "}
                    <Link
                        href='/auth/register'
                        className='text-green-600 hover:text-green-700 font-medium'
                    >
                            Regístrate
                    </Link>
                </div>
                <div className='mt-4 text-center text-sm'>
                    <Link
                        href='https://nucleox.isister.org/password/reset'
                        className='text-green-600 hover:text-green-700 font-medium'
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginPage