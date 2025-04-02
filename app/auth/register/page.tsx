'use client'

import { useState } from "react"
import { useAuth } from "../../../providers/AuthProvider"
import { useToast } from "../../../hooks/useToast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Dog } from "lucide-react"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import { PasswordInput } from "../../../components/password-input"

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register } = useAuth()
    const { toast } = useToast()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const name = formData.get('name') as string
        const password_confirmation = formData.get('password_confirmation') as string

        if (password !== password_confirmation) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Error en las contraseñas',
                description: 'Las contraseñas no coinciden. Por favor verifica e inténtalo de nuevo.'
            })
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Contraseña no válida',
                description: 'La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas, un número y un carácter especial.',
            })
            return
        }
        
        try {
            await register(email,password,name,password_confirmation)
            toast({
                title: '¡Registro completado!',
                description: 'Tu cuenta ha sido creada correctamente. Revise su correo por favor',

            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo completar el registro. Por favor, inténtalo más tarde'
            })
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
                <CardTitle className='text-2xl text-center'>Crear cuenta</CardTitle>
                <CardDescription className='text-center'>
                    Introduce tus datos para registrarte
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='space-y-2'>Nombre</Label>
                        <Input
                            id='name'
                            name='name'
                            placeholder='Tu nombre'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='nombre@ejemplo.com'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Contraseña</Label>
                        <PasswordInput id="password" name="password" required disabled={isLoading} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password_confirmation'>Repita contraseña</Label>
                        <PasswordInput id="password_confirmation" name="password_confirmation" required disabled={isLoading} />
                    </div>
                    <Input id='honey' name='honey' className='honey' />
                    <Button
                        type='submit'
                        className='w-full bg-green-600 hover:bg-green-700'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </form>
                <div className='mt-4 text-center text-sm'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link
                        href='/auth/login'
                        className='text-green-600 hover:text-green-700 font-medium'
                    >
                        Inicia sesión
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default RegisterPage