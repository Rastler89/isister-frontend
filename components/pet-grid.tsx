'use client'

import { useEffect, useState } from "react"
import AddPetModal from "./add-pet-modal"
import { Cat, Dog, MoreVertical, Pencil, Rabbit, Search, Trash2 } from "lucide-react"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import Link from "next/link"

const petTypes = {
    dog: { icon: Dog, label: "Perro" },
    cat: { icon: Cat, label: "Gato" },
    rabbit: { icon: Rabbit, label: "Conejo" },
  }

type PetType = keyof typeof petTypes

interface Pet {
    id: number
    name: string
    breed: string
    type: PetType
    birth: string
    image?: string
    lastCheckup: string
    nextVaccine: string
    status: "healthy" | "attention" | "warning"
  }

const PetGrid = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [pets, setPets] = useState<Pet[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost/api/pets',{
                        method: "GET", // Es opcional porque GET es el método por defecto
                        headers: {
                            "Content-Type": "application/json", // 
                            Accept: "application/json", 
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                if(!response.ok) {
                    throw new Error('Error al cargar las mascotas')
                }
                const data = await response.json()
                setPets(data.data)
            } catch (err: any) {
                console.error(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPets()
    }, [])

    const handleAddPet = (newPet: any) => {
        const pet: Pet = {
            id: pets.length + 1,
            name: newPet.name,
            type: newPet.type as PetType,
            breed: newPet.breed,
            birth: newPet.birth,
            image: newPet.image,
            lastCheckup: new Date().toISOString().split('T')[0],
            nextVaccine: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: "healthy"
          }
        setPets([...pets, newPet])
    }

    const calculateAge = (birthDate: string) => {
        const today = new Date(); // Fecha actual
        const dateBirth = new Date(birthDate); 
        
        let age = today.getFullYear() - dateBirth.getFullYear(); // Diferencia de años
        
        const monthDifference = today.getMonth() - dateBirth.getMonth();
        if (
          monthDifference < 0 || 
          (monthDifference === 0 && today.getDate() < dateBirth.getDate())
        ) {
          age--;
        }
      
        return age;
    }

    const filteredPets = pets.filter((pet) => 
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusColor = (status: Pet["status"]) => {
        switch (status) {
          case "healthy":
            return "bg-green-100 text-green-700 hover:bg-green-100"
          case "attention":
            return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
          case "warning":
            return "bg-red-100 text-red-700 hover:bg-red-100"
        }
      }
    
    const getStatusText = (status: Pet["status"]) => {
        switch (status) {
            case "healthy":
                return "Saludable"
            case "attention":
                return "Atención"
            case "warning":
                return "Urgente"
        }
    }
    if (loading) {
        return (
          <div className="container py-8 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <div className="h-8 w-48 bg-muted animate-pulse rounded-md mb-2" />
                <div className="h-4 w-72 bg-muted animate-pulse rounded-md" />
              </div>
              <div className="h-10 w-36 bg-muted animate-pulse rounded-md" />
            </div>
    
            <div className="h-12 w-64 bg-muted animate-pulse rounded-md mb-6" />
    
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
                      <div className="h-3 w-32 bg-muted animate-pulse rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-3 w-16 bg-muted animate-pulse rounded-md" />
                      <div className="h-3 w-12 bg-muted animate-pulse rounded-md" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 w-24 bg-muted animate-pulse rounded-md" />
                      <div className="h-3 w-20 bg-muted animate-pulse rounded-md" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-muted animate-pulse rounded-md" />
                      <div className="h-3 w-16 bg-muted animate-pulse rounded-md" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 w-16 bg-muted animate-pulse rounded-md" />
                      <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
                    </div>
                  </div>
                  <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>
        )
    }

    return (
        <div className='container py-8 px-4 md:px-6 max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Mis Mascotas</h1>
                    <p className='text-muted-foreground'>
                        Gestiona y monitorea la salud de tus mascotas
                    </p>
                </div>
                <AddPetModal onAdd={handleAddPet} />
            </div>

            <div className='flex items-center mb-6'>
                <div className='relative flex-1 max-w-sm'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                        placeholder='Buscar por nombre...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-9'
                    />
                </div>
            </div>
            
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredPets.map((pet) => {
                    const PetIcon = Cat//petTypes[pet.type].icon
                    
                    return(
                        <Card key={pet.id} className='border-green-100 hover:border-green-200 transition-all'>
                            <CardHeader className='relative'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant='ghost' className='absolute right-4 top-4 h-8 w-8 p-0'>
                                            <MoreVertical className='h-4 w-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        <DropdownMenuItem>
                                            <Pencil className='mr-2 h-4 w-4'/>
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className='text-red-600'>
                                            <Trash2 className='mr-2 h-4 w-4' />
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex items-center space-x-4'>
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage src={`http://localhost/storage/${pet.image}`} alt={pet.name} />
                                        <AvatarFallback>
                                            <PetIcon className='h-6 w-6' />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className='font-semibold leading-none'>{pet.name}</h3>
                                        <p className='text-sm text-muted-foreground'>
                                            Especie • Raza
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Edad:</span>
                                        <span>{calculateAge(pet.birth)} años</span>
                                    </div>
                                    {/*<div className="flex justify-between">
                                        <span className="text-muted-foreground">Última revisión:</span>
                                        <span>--</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Próxima vacuna:</span>
                                        <span>--</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Estado:</span>
                                        <Badge className={getStatusColor(pet.status)}>
                                        {getStatusText(pet.status)}
                                        </Badge>
                                    </div>*/}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                                    <Link href={`/pets/${pet.id}`}>
                                        Ver Perfil
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
            {filteredPets.length === 0 && (
                <div className="text-center py-12">
                <Dog className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No se encontraron mascotas</h3>
                <p className="text-muted-foreground">
                    {searchQuery 
                    ? "No hay mascotas que coincidan con tu búsqueda" 
                    : "Añade tu primera mascota para comenzar"}
                </p>
                </div>
            )}
        </div>
    )
}

export default PetGrid