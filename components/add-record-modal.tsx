'use client'

import { useEffect, useState } from 'react'
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
  type: 'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy' | 'visits' | 'treatments' | 'surgeries' | 'tests'
  id: number
  diseases:any
  typesMedical:any
}

export function AddRecordModal({ isOpen, onClose, onAdd, type, id, diseases, typesMedical}: AddRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<any>();
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
        data.DayOfWeek = formData.get('day')
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
        data.DayOfWeek = formData.get('day')
        data.time = formData.get('time')
        data.type = formData.get('type')
        data.amount = formData.get('amount')
        data.brand = formData.get('brand')
        data.information = formData.get('information')

        try {
          const response = await petService.createMeal(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'weight':
        data.value = formData.get('weight')
        data.type = '2'

        try {
          const response = await petService.createWeight(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'visits':
        data.date = formData.get('date')
        data.description = formData.get('description')

        try {
          const response = await petService.createVisit(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'treatments':
        data.start = formData.get('start')
        data.end = formData.get('end')
        data.repetition = formData.get('repetition')
        data.description = formData.get('description')

        try {
          const response = await petService.createTreatment(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'surgeries':
        data.date = formData.get('date')
        data.description = formData.get('description')
        data.preop = formData.get('preop')
        data.result = formData.get('result')
        data.complications = formData.get('complications')

        try {
          const response = await petService.createSurgery(id,data)
        } catch(error) {
          console.error(error)
        }
        break
      case 'tests':
        data.date = formData.get('date')
        data.type = selectedType
        data.description = formData.get('description')

        try {
          const response = await petService.createTest(id,data)
        } catch(error) {
          console.error(error)
        }
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

  const onChangeType = (value: any) => {
    setSelectedType(+value)
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
                  <SelectItem value='0'>Lunes</SelectItem>
                  <SelectItem value='1'>Martes</SelectItem>
                  <SelectItem value='2'>Miércoles</SelectItem>
                  <SelectItem value='3'>Jueves</SelectItem>
                  <SelectItem value='4'>Viernes</SelectItem>
                  <SelectItem value='5'>Sábado</SelectItem>
                  <SelectItem value='6'>Domingo</SelectItem>
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
                  <SelectItem value='0'>Lunes</SelectItem>
                  <SelectItem value='1'>Martes</SelectItem>
                  <SelectItem value='2'>Miércoles</SelectItem>
                  <SelectItem value='3'>Jueves</SelectItem>
                  <SelectItem value='4'>Viernes</SelectItem>
                  <SelectItem value='5'>Sábado</SelectItem>
                  <SelectItem value='6'>Domingo</SelectItem>
                  <SelectItem value='8'>Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='time'>Hora</Label>
              <Input id='time' name='time' type='time' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='type'>Tipo</Label>
              <Select name='type' required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el tipo de alimento' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>Seco (Pienso, forraje, semillas, ...)</SelectItem>
                  <SelectItem value='1'>Húmedo (Latas, purés, papillas, ...)</SelectItem>
                  <SelectItem value='2'>Vivo (Insectos, peces, ...)</SelectItem>
                  <SelectItem value='3'>Fresco (Carne cruda, fruta, ...)</SelectItem>
                  <SelectItem value='4'>Preparados (BARF, sopa casera, ...)</SelectItem>
                  <SelectItem value='5'>Suplementos (Vitaminas, minerales, ...)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='amount'>Cantidad</Label>
              <Input id='amount' name='amount' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='brand'>Marca</Label>
              <Input id='brand' name='brand' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='information'>Información nutritiva</Label>
              <Textarea id='information' name='information' />
            </div>
          </>
        )

      case 'weight':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='weight'>Peso (kg)</Label>
              <Input id='weight' name='weight' type='number' step='0.1' required />
            </div>
          </>
        )
      
      case 'visits':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea id='description' name='description' />
            </div>
          </>
        )
      
      case 'treatments': 
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='start'>Fecha de inicio</Label>
              <Input id='start' name='start' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='end'>Fecha de finalización</Label>
              <Input id='end' name='end' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='repetition'>Repetición</Label>
              <Select name='repetition' required>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona la repetición' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='6h'>6 Horas / 4 al dia</SelectItem>
                  <SelectItem value='8h'>8 Horas / 3 al dia</SelectItem>
                  <SelectItem value='12h'>12 Horas / 2 al dia</SelectItem>
                  <SelectItem value='24h'>24 Horas / 1 al dia</SelectItem>
                  <SelectItem value='3d'>3 dias</SelectItem>
                  <SelectItem value='5d'>5 dias</SelectItem>
                  <SelectItem value='7d'>7 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea id='description' name='description' />
            </div>
          </>
        )
      
      case 'surgeries':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea id='description' name='description' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='preop'>Preoperatorio</Label>
              <Textarea id='preop' name='preop' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='result'>Resultado</Label>
              <Textarea id='result' name='result' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='complications'>Complicaciones</Label>
              <Textarea id='complications' name='complications' />
            </div>
          </>
        )

      case 'tests':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input id='date' name='date' type='date' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='type'>Tipo de prueba</Label>
              <Select name='type' required value={selectedType} onValueChange={onChangeType}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el tipo de prueba' />
                </SelectTrigger>
                <SelectContent>
                  {typesMedical.map((type:any) => (
                    <SelectItem value={type.id} key={type.id}>
                      {type.slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Descripción</Label>
              <Textarea id='description' name='description' />
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
      case 'visits':
        return 'Añadir Visita Veterinaria'
      case 'treatments':
        return 'Añadir Tratamiento'
      case 'surgeries':
        return 'Añadir Operación'
      case 'tests':
        return 'Añadir Prueba Médica'	
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

