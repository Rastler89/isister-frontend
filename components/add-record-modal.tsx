'use client'

import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { petService } from '../services/petService'
import { toast } from '../hooks/useToast'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '../libs/utils'
import { Check, X } from 'lucide-react'
import { Badge } from './ui/badge'

interface AddRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: any) => void
  type: 'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy'
  id: number
  diseases:any
}

export function AddRecordModal({ isOpen, onClose, onAdd, type, id, diseases }: AddRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [commandOpen, setCommandOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: any = {}

    // Convertir FormData a objeto según el tipo
    switch (type) {
      case 'vaccine':
        data.application = formData.get('application')
        data.name = formData.get('name')
        data.lot = formData.get('lot')
        data.diseases = selectedDiseases
        data.next = formData.get('next')
        data.vcode = formData.get('vcode')

        try {
          const response = await petService.createVaccine(id,data)
        } catch(error) {
          console.error(error)
        }
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
          const response = await petService.createAllergy(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'walk':
        data.day = formData.get('day')
        data.time = formData.get('time')
        data.duration = formData.get('duration')
        data.description = formData.get('description')
        data.intensity = formData.get('intensity')
        data.route = formData.get('route')

        try {
          const response = await petService.createWalk(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'meal':
        data.dayOfWeek = formData.get('day')
        data.time = formData.get('time')
        data.type = formData.get('type')
        data.amount = formData.get('amount')
        break
      case 'weight':
        data.date = formData.get('date')
        data.weight = formData.get('weight')
        break
    }

    onAdd(data)
    setIsLoading(false)
    onClose()
  }

  const toggleDisease = (diseaseValue: string) => {
    setSelectedDiseases((current) =>
      current.includes(diseaseValue) ? current.filter((d) => d !== diseaseValue) : [...current, diseaseValue],
    )
  }

  const renderFields = () => {
    switch (type) {
      case 'vaccine':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='application'>Fecha de vacunación</Label>
              <Input id='application' name='application' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre de la vacuna</Label>
              <Input id='name' name='name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='lot'>Lote</Label>
              <Input id='lot' name='lot' required />
            </div>
            <div className="grid gap-2">
              <Label>Enfermedades que previene</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", selectedDiseases.length > 0 && "h-full")}
                  onClick={() => setCommandOpen(!commandOpen)}
                >
                  <span className="flex gap-1 flex-wrap">
                    {selectedDiseases.length > 0
                      ? selectedDiseases.map((disease) => {
                          const label = diseases.find((d) => d.id === disease)?.name.es
                          return (
                            <Badge key={disease} variant="secondary" className="mr-1 mb-1">
                              {label}
                              <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    toggleDisease(disease)
                                  }
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleDisease(disease)
                                }}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          )
                        })
                      : "Seleccionar enfermedades..."}
                  </span>
                </Button>
                {commandOpen && (
                  <div className="absolute top-full z-50 w-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <Command className="w-full">
                      <CommandInput placeholder="Buscar enfermedad..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-auto">
                          {diseases.map((disease) => (
                            <CommandItem key={disease.id} onSelect={() => toggleDisease(disease.id)}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={cn(
                                    "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    selectedDiseases.includes(disease.id)
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <Check className={cn("h-4 w-4")} />
                                </div>
                                <span>{disease.name.es}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                )}
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='next'>Próxima dosis</Label>
              <Input id='next' name='next' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='vcode'>Veterinario</Label>
              <Input id='vcode' name='vcode' required />
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
                  <SelectItem value='0'>Leve</SelectItem>
                  <SelectItem value='1'>Moderada</SelectItem>
                  <SelectItem value='2'>Grave</SelectItem>
                  <SelectItem value='3'>Anaflaxia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='symptoms'>Síntomas</Label>
              <Textarea id='symptoms' name='description' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='created_at'>Fecha de diagnóstico</Label>
              <Input id='created_at' name='created_at' type='date' required />
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
              <Input id='time' name='time' type='time' required />
            </div>
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

