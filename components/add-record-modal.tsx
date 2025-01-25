'use client'

import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

interface AddRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: any) => void
  type: 'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy'
}

export function AddRecordModal({ isOpen, onClose, onAdd, type }: AddRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: any = {}

    // Convertir FormData a objeto según el tipo
    switch (type) {
      case 'vaccine':
        data.date = formData.get('date')
        data.name = formData.get('name')
        data.nextDue = formData.get('nextDue')
        break
      case 'health':
        data.date = formData.get('date')
        data.issue = formData.get('issue')
        data.notes = formData.get('notes')
        break
      case 'allergy':
        data.name = formData.get('name')
        data.severity = formData.get('severity')
        data.symptoms = formData.get('symptoms')
        data.diagnosis_date = formData.get('diagnosis_date')
        break
      case 'walk':
        data.day = formData.get('day')
        data.time = formData.get('time')
        data.duration = formData.get('duration')
        break
      case 'meal':
        data.day = formData.get('day')
        data.time = formData.get('time')
        data.type = formData.get('type')
        data.amount = formData.get('amount')
        break
      case 'weight':
        data.date = formData.get('date')
        data.weight = formData.get('weight')
        break
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    onAdd(data)
    setIsLoading(false)
    onClose()
  }

  const renderFields = () => {
    switch (type) {
      case 'vaccine':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha de vacunación</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre de la vacuna</Label>
              <Input id='name' name='name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='nextDue'>Próxima dosis</Label>
              <Input id='nextDue' name='nextDue' type='date' required />
            </div>
          </>
        )

      case 'health':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='issue'>Motivo</Label>
              <Input id='issue' name='issue' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='notes'>Notas</Label>
              <Textarea id='notes' name='notes' />
            </div>
          </>
        )

      case 'allergy':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Alérgeno</Label>
              <Input id='name' name='name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='severity'>Severidad</Label>
              <Select name='severity' required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona la severidad' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='mild'>Leve</SelectItem>
                  <SelectItem value='moderate'>Moderada</SelectItem>
                  <SelectItem value='severe'>Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='symptoms'>Síntomas</Label>
              <Textarea id='symptoms' name='symptoms' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='diagnosis_date'>Fecha de diagnóstico</Label>
              <Input id='diagnosis_date' name='diagnosis_date' type='date' required />
            </div>
          </>
        )

      case 'walk':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='day'>Día</Label>
              <Select name='day' required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el día' />
                </SelectTrigger>
                <SelectContent>
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
              <Input id='time' name='time' type='time' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='duration'>Duración</Label>
              <Select name='duration' required>
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
          </>
        )

      case 'meal':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='day'>Día</Label>
              <Select name='day' required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el día' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Todos'>Todos los días</SelectItem>
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
              <Input id='time' name='time' type='time' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='type'>Tipo</Label>
              <Input id='type' name='type' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='amount'>Cantidad</Label>
              <Input id='amount' name='amount' required />
            </div>
          </>
        )

      case 'weight':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='weight'>Peso (kg)</Label>
              <Input id='weight' name='weight' type='number' step='0.1' required />
            </div>
          </>
        )
    }
  }

  const getTitleByType = () => {
    switch (type) {
      case 'vaccine':
        return 'Añadir Vacuna'
      case 'health':
        return 'Añadir Registro Médico'
      case 'allergy':
        return 'Añadir Alergia'
      case 'walk':
        return 'Programar Paseo'
      case 'meal':
        return 'Programar Comida'
      case 'weight':
        return 'Añadir Peso'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{getTitleByType()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-4'>{renderFields()}</div>
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

