'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { petService } from '../services/petService'
import { cn } from '../libs/utils'
import { Badge } from './ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Check, X } from 'lucide-react'

interface EditRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  type: 'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy'
  initialData?: {
    id?: number
    application?: string
    lot?:string
    date?: string
    name?: string
    next?: string
    issue?: string
    notes?: string
    severity?: number
    description?: string
    created_at?: string
    vcode?: string
    disease?: any
  }
  id: number
  diseases: any
}


export function EditRecordModal({ isOpen, onClose, onSave, type, initialData = {}, id, diseases }: EditRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>(
    initialData?.disease ? initialData.disease.map((el: { id: any }) => el.id) : []
  );  
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    setSelectedDiseases(initialData?.disease ? initialData.disease.map((el: { id: any }) => el.id) : []);
  }, [initialData]);

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
        data.application = formData.get('application')
        data.name = formData.get('name')
        data.lot = formData.get('lot')
        data.diseases = selectedDiseases
        data.next = formData.get('next')
        data.vcode = formData.get('vcode')
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

  const toggleDisease = (diseaseValue: string) => {
    setSelectedDiseases((current) =>
      current.includes(diseaseValue) ? current.filter((d) => d !== diseaseValue) : [...current, diseaseValue],
    )
  }

  console.log(selectedDiseases)

  const renderFields = () => {
    switch (type) {
      case 'vaccine':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor='application'>Fecha de vacunación</Label>
              <Input id='application' name='application' type='date' defaultValue={initialData.application}/>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre de la vacuna</Label>
              <Input id='name' name='name' defaultValue={initialData.name}/>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='lot'>Lote</Label>
              <Input id='lot' name='lot' defaultValue={initialData.lot}/>
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
              <Input id='next' name='next' type='date' defaultValue={initialData.next}/>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='vcode'>Veterinario</Label>
              <Input id='vcode' name='vcode' defaultValue={initialData.vcode}/>
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

