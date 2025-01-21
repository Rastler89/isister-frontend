'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Plus, Upload } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'
  

interface AddPetModalProps {
    onAdd: (pet: any) => void
}

const species = [
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' },
    { value: 'rabbit', label: 'Conejo' },
    { value: 'bird', label: 'Pájaro' },
    { value: 'hamster', label: 'Hámster' },
    { value: 'fish', label: 'Pez' },
  ]

  const breeds = {
    dog: [
      { value: 'border_collie', label: 'Border Collie' },
      { value: 'golden_retriever', label: 'Golden Retriever' },
      { value: 'german_shepherd', label: 'Pastor Alemán' },
      { value: 'labrador', label: 'Labrador' },
      { value: 'bulldog', label: 'Bulldog' },
      { value: 'poodle', label: 'Caniche' },
      { value: 'rottweiler', label: 'Rottweiler' },
      { value: 'yorkshire', label: 'Yorkshire Terrier' },
      { value: 'beagle', label: 'Beagle' },
      { value: 'husky', label: 'Husky Siberiano' },
    ],
    cat: [
      { value: 'siamese', label: 'Siamés' },
      { value: 'persian', label: 'Persa' },
      { value: 'maine_coon', label: 'Maine Coon' },
      { value: 'bengal', label: 'Bengalí' },
      { value: 'sphynx', label: 'Esfinge' },
      { value: 'british_shorthair', label: 'British Shorthair' },
      { value: 'ragdoll', label: 'Ragdoll' },
      { value: 'russian_blue', label: 'Azul Ruso' },
    ],
    rabbit: [
      { value: 'holland_lop', label: 'Holland Lop' },
      { value: 'mini_rex', label: 'Mini Rex' },
      { value: 'netherland_dwarf', label: 'Netherland Dwarf' },
      { value: 'lionhead', label: 'Cabeza de León' },
    ],
    bird: [
      { value: 'budgie', label: 'Periquito' },
      { value: 'cockatiel', label: 'Cacatúa Ninfa' },
      { value: 'lovebird', label: 'Agapornis' },
      { value: 'canary', label: 'Canario' },
    ],
    hamster: [
      { value: 'syrian', label: 'Sirio' },
      { value: 'roborovski', label: 'Roborovski' },
      { value: 'chinese', label: 'Chino' },
      { value: 'winter_white', label: 'Ruso Campbell' },
    ],
    fish: [
      { value: 'goldfish', label: 'Pez Dorado' },
      { value: 'betta', label: 'Betta' },
      { value: 'guppy', label: 'Guppy' },
      { value: 'tetra', label: 'Tetra' },
    ],
  }

const AddPetModal = ({onAdd}: AddPetModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview,setImagePreview] = useState<string | null>(null)
    const [openSpecies, setOpenSpecies] = useState(false)
    const [openBreeds, setOpenBreeds] = useState(false)
    const [selectedSpecies, setSelectedSpecies] = useState<string>('')
    const [selectedBreed, setSelectedBreed] = useState<string>('')

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const petData = {
            name: formData.get('name'),
            type: formData.get('type'),
            breed: formData.get('breed'),
            birthDate: formData.get('birthDate'),
            weight: formData.get('weight'),
            image: imagePreview
        }

        //simulacion
        await new Promise(resolve => setTimeout(resolve,1000))
        onAdd(petData)
        setIsLoading(false)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSpeciesSelect = (value: string) => {
        setSelectedSpecies(value)
        setSelectedBreed('')
        setOpenSpecies(false)
      }
    
      const handleBreedSelect = (value: string) => {
        setSelectedBreed(value)
        setOpenBreeds(false)
      }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-green-600 hover:bg-green-700'>
                    <Plus className='mr-2 h-4 w-4' /> Añadir Mascota
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Añadir Nueva Mascota</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-6 pt-4'>
                    <div className='flex justify-center'>
                        <div className='relative'>
                            <Avatar className='h-24 w-24'>
                                <AvatarImage src={imagePreview || ''} />
                                <AvatarFallback>
                                    <Upload className='h-8 w-8 text-muted-foreground' />
                                </AvatarFallback>
                            </Avatar>
                            <Label
                                htmlFor='picture'
                                className='absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-green-600 hover:bg-green-700'
                            >
                                <Plus className='h-4 w-4 text-white' />
                                <Input
                                    id='picture'
                                    type='file'
                                    accept='image/*'
                                    className='sr-only'
                                    onChange={handleImageChange}
                                />
                            </Label>
                        </div>
                    </div>

                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='name'>Nombre</Label>
                            <Input
                                id='name'
                                name='name'
                                placeholder='Nombre de tu mascota'
                                required
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label>Especie</Label>
                            
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='breed'>Raza</Label>
                            <Input 
                                id='breed'
                                name='breed'
                                placeholder='Raza de tu mascota'
                                required
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='birthDate'>Fecha de nacimiento</Label>
                            <Input
                                id='birthDate'
                                name='birthDate'
                                type='date'
                                required
                            />
                        </div>

                        <div className='flex justify-end gap-4'>
                            <DialogTrigger asChild>
                                <Button type='button' variant='outline'>Cancelar</Button>
                            </DialogTrigger>
                            <Button
                                type='submit'
                                className='bg-green-600 hover:bg-green-700'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Añadiendo...' : 'Añadir mascota'}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPetModal