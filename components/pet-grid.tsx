'use client'

import { useState } from "react"
import AddPetModal from "./add-pet-modal"

interface Pet {
    id: number
    name: string
    breed: string
    age: number
    image?: string
    lastCheckup: string
    nextVaccine: string
    status: "healthy" | "attention" | "warning"
  }

const PetGrid = () => {
    const [pets, setPets] = useState<Pet[]>([])


    const handleAddPet = (newPet: any) => {
        setPets([...pets, newPet])
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
       </div>
    )
}

export default PetGrid