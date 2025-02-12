'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { petService } from '../services/petService'

interface EditRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  type: 'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy'
  initialData?: {
    id?: number
    date?: string
    name?: string
    nextDue?: string
    issue?: string
    notes?: string
    severity?: number
    description?: string
    created_at?: string
  }
  id: number
  diseases: any
}


export function EditRecordModal({ isOpen, onClose, onSave, type, initialData = {}, id, diseases }: EditRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)


  const formatDate = (isoDate: string) => {
    return isoDate.split("T")[0]; // Extrae solo la parte YYYY-MM-DD
  }

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
        data.description = formData.get('description')
        data.created_at = formData.get('created_at')

        try {
          if (initialData.id !== undefined) {
            const response = await petService.updateAllergy(id, data, initialData.id)
          }
        } catch(error) {
          console.error(error)
        }
        break
    }

    onSave(data)
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
              <Input id='date' name='date' type='date' defaultValue={initialData?.date || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre de la vacuna</Label>
              <Input id='name' name='name' defaultValue={initialData?.name || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='nextDue'>Próxima dosis</Label>
              <Input id='nextDue' name='nextDue' type='date' defaultValue={initialData?.nextDue || ''} required />
            </div>
          </>
        )

      case 'health':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' defaultValue={initialData?.date || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='issue'>Motivo</Label>
              <Input id='issue' name='issue' defaultValue={initialData?.issue || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='notes'>Notas</Label>
              <Textarea id='notes' name='notes' defaultValue={initialData?.notes || ''} />
            </div>
          </>
        )

      case 'allergy':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Alérgeno</Label>
              <Input id='name' name='name' defaultValue={initialData?.name || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='severity'>Severidad</Label>
              <Select name='severity' defaultValue={String(initialData?.severity || 0)} required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona la severidad' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>Leve</SelectItem>
                  <SelectItem value='1'>Moderada</SelectItem>
                  <SelectItem value='2'>Grave</SelectItem>
                  <SelectItem value='3'>Anafilaxia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Síntomas</Label>
              <Textarea id='description' name='description' defaultValue={initialData?.description || ''} required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='creatd_at'>Fecha de diagnóstico</Label>
              <Input
                id='created_at'
                name='created_at'
                type='date'
                defaultValue={initialData?.created_at ? formatDate(initialData.created_at) : ''}
                required
              />
            </div>
          </>
        )
    }
  }

  const getTitleByType = () => {
    switch (type) {
      case 'vaccine':
        return 'Editar Vacuna'
      case 'health':
        return 'Editar Registro Médico'
      case 'allergy':
        return 'Editar Alergia'
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
            <Button type='submit' className='bg-green-600 hover:bg-orange-700' disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

