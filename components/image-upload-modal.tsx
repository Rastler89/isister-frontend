'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (image: string) => void
  petId: string
}

export function ImageUploadModal({ isOpen, onClose, onUpload, petId }: ImageUploadModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('petId', petId)

    try {
      const response = await fetch(`http://localhost/api/pets/${petId}`,{
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })

      if(!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      onUpload('ok')
      onClose()
    } catch(error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cambiar foto de perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden'>
                {imagePreview ? (
                  <img src={imagePreview || '/placeholder.svg'} alt='Preview' className='w-full h-full object-cover' />
                ) : (
                  <div className='text-center p-4'>
                    <Upload className='w-8 h-8 mx-auto mb-2 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>Arrastra una imagen o haz clic para seleccionar</p>
                  </div>
                )}
                <Input
                  id='picture'
                  type='file'
                  accept='image/*'
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  onChange={handleImageChange}
                />
              </div>
              <Label htmlFor='picture' className='text-sm text-muted-foreground'>
                Formato: JPG, PNG. Tamaño máximo: 5MB
              </Label>
            </div>
          </div>
          <div className='flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' className='bg-green-600 hover:bg-green-700' disabled={!imagePreview}>
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

