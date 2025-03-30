'use client'

import { User, Lock, MapPin, Check, ChevronsUpDown, Car, Phone } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { useEffect, useState } from "react"
import { petService } from "../../services/petService"
import { SearchableSelect } from "../../components/searchable-select"
import { Button } from "../../components/ui/button"
import { useToast } from "../../hooks/useToast"
import { Progress } from "../../components/ui/progress"

export const ProfilePage = () => {
    const { toast } = useToast()

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [stateOptions, setStateOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [passwordStrength, setPasswordStrength] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await petService.getCountries() as { id: number, name: { es: string, en: string } }[]
                if (response.length > 0) {
                    const transformedOptions = transformData(response)
                    setCountries(response)
                    setCountryOptions(transformedOptions)
                }
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        const fetchUser = async () => {
            setLoading(true)
            try {
                const response = await petService.getProfile()
                if (response) {
                    setUser(response)
                    setSelectedCountry(response.country)
                    setSelectedState(response.state)
                    setSelectedCity(response.city)
                }
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        fetchUser()
    }, [])

    const onSelectCountry = (value: string) => {
        setSelectedCountry(value)
        const selectedCountry = countries.find((country) => country.id === value)
        if (selectedCountry) {
            setStates(selectedCountry.states)
            const transformedOptions = transformData(selectedCountry.states)
            setStateOptions(transformedOptions)
        }
    }

    const onSelectState = (value: string) => {
        setSelectedState(value)
        const selectedState = states.find((state) => state.id === value)
        if (selectedState) {
            const transformedOptions = transformData(selectedState.towns)
            setCityOptions(transformedOptions)
        }
    }

    const onSelectCity = (value: string) => {
        setSelectedCity(value)
    }

    const transformData = (data:any) => {
        const transformedOptions = data.map((element:any) => ({
            value: element.id, 
            label: element.name.es || element.name.en, 
        }))
        return transformedOptions
    }

    const handleAddressUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const address = formData.get('adress') as string
        const country = formData.get('country') as string
        const state = formData.get('state') as string
        const city = formData.get('city') as string
        const cp = formData.get('cp') as string
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string

        const addressData = {
            adress: address,
            country: country,
            state: state,
            city: city,
            cp: cp,
            name: name,
            email: email,
            phone: phone,
        }

        try {
            const response = petService.updateProfile(addressData)
            toast({
                title: 'Éxito',
                description: 'Dirección actualizada correctamente',
                variant: 'default',
            })
  
        } catch(error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Error al actualizar la dirección',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }

        
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const currentPassword = formData.get('currentPassword') as string
        const newPassword = formData.get('newPassword') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if(newPassword !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }
        if (calculatePasswordStrength(newPassword) < 100) {
            toast({
                title: 'Error',
                description: 'La contraseña no cumple con los requisitos de seguridad',
                variant: 'destructive',
            })
            setIsLoading(false)
            return
        }

        const passwordData = {
            oldPassword: currentPassword,
            newPassword: newPassword,
            rePassword: confirmPassword,
        }

        try {
            const response = petService.changePassword(passwordData)
            toast({
                title: 'Éxito',
                description: 'Contraseña actualizada correctamente',
                variant: 'default',
            })
            
        } catch(error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Error al actualizar la contraseña',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (password.match(/[A-Z]/)) strength += 25
        if (password.match(/[0-9]/)) strength += 25
        if (password.match(/[^A-Za-z0-9]/)) strength += 25
        return strength
    }


    if(loading) {
        return (
            <div className='main-h-screen flex items-center justify-center'>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div className='main-h-screen flex flex-col bg-green-50/30'>
            <main className='flex-1 container max-w-4xl mx-auto py-8 px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold'>Mi Perfil</h1>
                    <p className='text-muted-foreground'>Gestiona tu información personal y preferencias</p>
                </div>
                <Tabs defaultValue='personal' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-2 lg:w-[400px]'>
                        <TabsTrigger value='personal' className='flex items-center gap-2'>
                            <User className='h-4 w-4' />
                            Información personal
                        </TabsTrigger>
                        <TabsTrigger value='security' className='flex items-center gap-2'>
                            <Lock className='h-4 w-4' />
                            Seguridad
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='personal'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <User className='h-4 w-4' />
                                    Información personal
                                </CardTitle>
                                <CardDescription>Actualiza tu información personal y dirección de contacto</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddressUpdate} className='space-y-4'>
                                    <div>
                                        <h3 className='text-lg font-medium mb-4'>Datos personales</h3>
                                        <div className='grid gap-4 md:grid-cols-2'>
                                            <div>
                                                <Label htmlFor='name'>Nombre</Label>
                                                <Input type='text' id='name' name='name' required value={user.name}/>
                                            </div>
                                            <div>
                                                <Label htmlFor='email'>Corre electrónico</Label>
                                                <Input type='email' id='email' name='email' required value={user.email}/>
                                            </div>
                                            <div>
                                                <Label htmlFor='phone' className='flex items-center gap-1 mb-2'>
                                                    <Phone className='h-3.5 w-3.5' />
                                                    Teléfono
                                                </Label>
                                                <Input type='text' id='phone' name='phone' required value={user.phone}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid gap-4 md:grid-cols-6'>
                                        <h3 className='text-lg font-medium mb-4 flex items-center gap-2'>
                                            <MapPin className='h-4 w-4' />
                                            Dirección
                                        </h3>
                                        <div className='md:col-span-6'>
                                            <Label htmlFor=''>Dirección</Label>
                                            <Input type='text' id='adress' name='adress' required value={user.adress}/>
                                        </div>
                                        <div className='md:col-span-2'>
                                            <Label htmlFor='country'>País</Label>
                                            <SearchableSelect
                                                options={countryOptions}
                                                value={selectedCountry}
                                                onValueChange={onSelectCountry}
                                                placeholder="Seleccionar país..."
                                                searchPlaceholder="Buscar país..."
                                            />
                                        </div>
                                        <div className='md:col-span-2'>
                                            <Label htmlFor='state'>Provincia</Label>
                                            <SearchableSelect
                                                options={stateOptions}
                                                value={selectedState}
                                                onValueChange={onSelectState}
                                                placeholder="Seleccionar provincia..."
                                                searchPlaceholder="Buscar provincia..."
                                            />
                                        </div>
                                        <div className='md:col-span-2'>
                                            <Label htmlFor='city'>Ciudad</Label>
                                            <SearchableSelect
                                                options={cityOptions}
                                                value={selectedCity}
                                                onValueChange={onSelectCity}
                                                placeholder="Seleccionar país..."
                                                searchPlaceholder="Buscar país..."
                                            />
                                        </div>
                                        <div className='md:col-span-2'>
                                            <Label htmlFor='cp'>Código Postal</Label>
                                            <Input type='text' id='cp' name='cp' required value={user.cp}/>
                                        </div>
                                        <div className='md:col-span-6'>
                                            <Button type='submit' className='w-full bg-green-600 hover:bg-green-700' disabled={isLoading}>
                                                {isLoading ? 'Actualizando...' : 'Actualizar dirección'}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='security'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Lock className='h-5 w-5' />
                                    Cambiar Contraseña
                                </CardTitle>
                                <CardDescription>
                                    Actualiza tu contraseña. Debe incluir mayúsculas, números y caracteres especiales.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordChange} className='space-y-4'>
                                    <div className='space-y-2'>
                                        <Label htmlFor='currentPassword'>Contraseña actual</Label>
                                        <Input type='password' id='currentPassword' name='currentPassword' required />
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='newPassword'>Nueva contraseña</Label>
                                        <Input id='newPassword' name='newPassword' type='password' required  onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}/>
                                        <Progress value={passwordStrength} className='h-2' />
                                        <p className='text-sm text-muted-foreground'>
                                            La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, números y caracteres especiales.
                                        </p>
                                    </div>
                                    <div className='space-y-2'>
                                        <Label htmlFor='confirmPassword'>Confirmar nueva contraseña</Label>
                                        <Input id='confirmPassword' name='confirmPassword' type='password' required />
                                    </div>
                                    <Button type='submit' className='w-full bg-green-600 hover:bg-green-700' disabled={isLoading}>
                                        {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default ProfilePage