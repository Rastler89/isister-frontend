'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'


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
    day: '1',
    time: '08:00',
    duration: '30',
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
      description: formData.get('description'),
      ...(type === 'walk' 
        ? { 
          duration: formData.get('duration'),
          intensity: formData.get('intensity'),
          route: formData.get('route')
          } 
        : {}),
      ...(type === 'meal'
        ? {
            type: formData.get('type'),
            amount: formData.get('amount'),
          }
        : {}),
    }

    
    //await new Promise((resolve) => setTimeout(resolve, 1000))
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
                  <SelectItem value='1'>Lunes</SelectItem>
                  <SelectItem value='2'>Martes</SelectItem>
                  <SelectItem value='3'>Miércoles</SelectItem>
                  <SelectItem value='4'>Jueves</SelectItem>
                  <SelectItem value='5'>Viernes</SelectItem>
                  <SelectItem value='6'>Sábado</SelectItem>
                  <SelectItem value='7'>Domingo</SelectItem>
                  <SelectItem value='8'>Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='time'>Hora</Label>
              <Input id='time' name='time' type='time' defaultValue={initialData.time} required />
            </div>

            {type === 'walk' && (
              <>
                <div className='grid gap-2'>
                  <Label htmlFor='duration'>Duración</Label>
                  <Select name='duration' required>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona la duración' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='15'>15 minutos</SelectItem>
                      <SelectItem value='30'>30 minutos</SelectItem>
                      <SelectItem value='45'>45 minutos</SelectItem>
                      <SelectItem value='60'>1 hora</SelectItem>
                      <SelectItem value='90'>1 hora 30 minutos</SelectItem>
                      <SelectItem value='120'>2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>Descripción</Label>
                  <Textarea id='description' name='description' />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='intensity'>Intensidad</Label>
                  <Select name='intensity' required>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona la duración' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='0'>Leve</SelectItem>
                      <SelectItem value='1'>Moderada</SelectItem>
                      <SelectItem value='2'>Intensa</SelectItem>
                      <SelectItem value='3'>Extrema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='route'>Ruta</Label>
                  <Textarea id='route' name='route' />
                </div>
              </>
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

