'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


interface EditScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  type: 'walk' | 'meal'
  initialData?: {
    day: string
    time: string
    duration?: string
    type?: string
    amount?: string
  }
}

export function EditScheduleModal({
  isOpen,
  onClose,
  onSave,
  type,
  initialData = {
    day: 'Lunes',
    time: '08:00',
    duration: '30 min',
    type: '',
    amount: '',
  },
}: EditScheduleModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      day: formData.get('day'),
      time: formData.get('time'),
      ...(type === 'walk' ? { duration: formData.get('duration') } : {}),
      ...(type === 'meal'
        ? {
            type: formData.get('type'),
            amount: formData.get('amount'),
          }
        : {}),
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave(data)
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{type === 'walk' ? 'Editar Paseo' : 'Editar Comida'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='day'>Día</Label>
              <Select name='day' defaultValue={initialData.day} required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el día' />
                </SelectTrigger>
                <SelectContent>
                  {type === 'meal' && <SelectItem value='Todos'>Todos los días</SelectItem>}
                  <SelectItem value='Lunes'>Lunes</SelectItem>
                  <SelectItem value='Martes'>Martes</SelectItem>
                  <SelectItem value='Miércoles'>Miércoles</SelectItem>
                  <SelectItem value='Jueves'>Jueves</SelectItem>
                  <SelectItem value='Viernes'>Viernes</SelectItem>
                  <SelectItem value='Sábado'>Sábado</SelectItem>
                  <SelectItem value='Domingo'>Domingo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='time'>Hora</Label>
              <Input id='time' name='time' type='time' defaultValue={initialData.time} required />
            </div>

            {type === 'walk' && (
              <div className='grid gap-2'>
                <Label htmlFor='duration'>Duración</Label>
                <Select name='duration' defaultValue={initialData.duration} required>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona la duración' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='15 min'>15 minutos</SelectItem>
                    <SelectItem value='30 min'>30 minutos</SelectItem>
                    <SelectItem value='45 min'>45 minutos</SelectItem>
                    <SelectItem value='60 min'>1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {type === 'meal' && (
              <>
                <div className='grid gap-2'>
                  <Label htmlFor='type'>Tipo</Label>
                  <Input id='type' name='type' defaultValue={initialData.type} required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='amount'>Cantidad</Label>
                  <Input id='amount' name='amount' defaultValue={initialData.amount} required />
                </div>
              </>
            )}
          </div>

          <div className='flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit' className='bg-green-600 hover:bg-green-700' disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

