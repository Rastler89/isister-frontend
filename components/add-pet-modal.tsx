'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Plus, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

interface AddPetModalProps {
    onAdd: (pet: any) => void
}

const AddPetModal = ({onAdd}: AddPetModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview,setImagePreview] = useState<string | null>(null)

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
                            <Label htmlFor='type'>Tipo de mascota</Label>
                            
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPetModal