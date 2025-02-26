'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, Plus, Upload } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '../libs/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { toast } from '../hooks/useToast'
  

interface AddPetModalProps {
    onAdd: (pet: any) => void
}

const AddPetModal = ({onAdd}: AddPetModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview,setImagePreview] = useState<string | null>(null)
    const [openSpecies, setOpenSpecies] = useState(false)
    const [openBreeds, setOpenBreeds] = useState(false)
    const [selectedSpecies, setSelectedSpecies] = useState<number>(0)
    const [selectedBreed, setSelectedBreed] = useState<number>(0)
    const [species, setSpecies] = useState([])
    const [breeds, setBreeds] = useState([])
    const [sex, setSex] = useState<string>('')

    const transformData = (apiData) => {
        const species = apiData.map((specie:any) => ({
          value: specie.id, 
          label: specie.name.es, 
        }));
      
        const breeds = apiData.reduce((acc:any, specie:any) => {
          acc[specie.id] = specie.breeds.map((breed:any) => ({
            value: breed.id, 
            label: breed.name.es, 
          }));
          return acc
        }, {});
      
        setSpecies(species)
        setBreeds(breeds)
      };

    useEffect(() => {
        const fetchSpecies = async() => {
            try {
                const response = await fetch('http://localhost/api/species', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                if(!response.ok) {
                    throw new Error('Error al obtener las especies')
                }
                const data = await response.json()
                transformData(data)
            } catch (err: any) {
                console.error(err.message)
            }
        } 

        fetchSpecies()
    }, [])

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const petData = {
            name: formData.get('name'),
            breed: selectedBreed,
            birth: formData.get('birthDate'),
            gender: sex,
            code: formData.get('chipCode'),
        }

        //simulacion
        try {
            const response = await fetch('http://localhost/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(petData)
            })
            if(!response.ok) {
                throw new Error('Error al añadir la mascota')
            }
            toast({
                title: 'Mascota añadida',
                description: 'La mascota se ha añadido correctamente'
            })
            onAdd(petData)
        } catch(err: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se ha podido añadir la mascota'
            })
        } finally {
            setIsLoading(false)
        }
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

        setSelectedSpecies(species.find((specie) => specie.label === value)?.value || 0)
        setSelectedBreed(0)
        setOpenSpecies(false)
      }
    
      const handleBreedSelect = (value: string) => {
        setSelectedBreed(breeds[selectedSpecies as keyof typeof breeds]?.find((breed) => breed.label === value)?.value || 0)
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
                    {/*
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
                    </div>*/}

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

                        <div className='grid gap-4'>
                            <Label>Sexo</Label>
                            <RadioGroup name='sex' value={sex} onValueChange={setSex} className='flex space-x-4' required>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='M' id='male' />
                                    <Label htmlFor='male' className='cursor-pointer'>
                                        Macho
                                    </Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='F' id='female' />
                                    <Label htmlFor='female' className='cursor-pointer'>
                                        Hembra
                                    </Label>
                                </div>
                            </RadioGroup>                           
                        </div>

                        <div className='grid gap-2'>
                            <Label>Especie</Label>
                            <Popover open={openSpecies} onOpenChange={setOpenSpecies}>
                                <PopoverTrigger asChild>
                                    <Button variant='outline' role='combobox' aria-expanded={openSpecies} className='justify-between'>
                                        {selectedSpecies
                                            ? species.find((species) => species.value === selectedSpecies)?.label
                                            : 'Selecciona una especie'}
                                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                        <CommandInput placeholder='Buscar especie...' />
                                        <CommandList>
                                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                            <CommandGroup>
                                                {species.map((species) => (
                                                <CommandItem key={species.value} value={species.value} onSelect={handleSpeciesSelect}>
                                                    <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        selectedSpecies === species.value ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                    />
                                                    {species.label}
                                                </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label>Raza</Label>
                            <Popover open={openBreeds} onOpenChange={setOpenBreeds}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openBreeds}
                                    className="justify-between"
                                    disabled={!selectedSpecies}
                                >
                                    {selectedBreed
                                    ? breeds[selectedSpecies as keyof typeof breeds]?.find((breed) => breed.value === selectedBreed)
                                        ?.label
                                    : "Selecciona la raza..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Buscar raza..." />
                                    <CommandList>
                                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                    <CommandGroup>
                                        {selectedSpecies &&
                                        breeds[selectedSpecies as keyof typeof breeds]?.map((breed) => (
                                            <CommandItem key={breed.value} value={breed.value} onSelect={handleBreedSelect}>
                                            <Check
                                                className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedBreed === breed.value ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {breed.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </CommandList>
                                </Command>
                                </PopoverContent>
                            </Popover>
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

                        <div className='grid gap-2'>
                            <Label htmlFor='chipCode'>Código de chip</Label>
                            <Input
                                id='chipCode'
                                name='chipCode'
                                placeholder='Código de chip'
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