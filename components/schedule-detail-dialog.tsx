import { Edit2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ConfirmationDialog } from './confirmation-dialog'
import { useState } from 'react'
import { petService } from '../services/petService'
import { on } from 'events'


interface ScheduleDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: (id:any,day:any,time:any) => void
  type: 'walk' | 'meal'
  data: {
    day: string
    time: string
    duration?: string
    type?: string
    amount?: string
    description?: string
    route?: string
    intensity?: number
    brand?: string
    nutritionalInfo?: string
    instructions?: string
  }
  id: number
}

const daysWeek = {
  'Lunes': '0',
  'Martes': '1',
  'Miércoles': '2',
  'Jueves': '3',
  'Viernes': '4',
  'Sábado': '5',
  'Domingo': '6',
  'Todos': '8'
}

export function ScheduleDetailDialog({ isOpen, onClose, onEdit, type, data, id, onDelete }: ScheduleDetailDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)


  const getIntensityLabel = (intensity: number | undefined) => {
    switch (intensity) {
      case 0:
        return 'Leve'
      case 1:
        return 'Moderada'
      case 2:
        return 'Intensa'
      case 3:
        return 'Extrema'
      default:
        return 'No especificada'
    }
  }

  const handleDelete = async () => {
    setShowConfirmDialog(true)
    onDelete(id, daysWeek[data.day as keyof typeof daysWeek], data.time.split(":")[0])
    onClose()
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{type === 'walk' ? 'Detalles del Paseo' : 'Detalles de la Comida'}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='flex justify-between items-center'>
              <Badge variant='outline' className='w-fit'>
                {data.day} - {data.time}
              </Badge>
              <div className='flex gap-2'>
                {/*}
                <Button variant='outline' size='icon' onClick={onEdit} className='h-8 w-8'>
                  <Edit2 className='h-4 w-4' />
                </Button>*/}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setShowConfirmDialog(true)}
                  className='h-8 w-8 text-red-600 hover:text-red-600 hover:bg-red-100'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {type === 'walk' ? (
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Descripción</h4>
                <p className='text-sm text-muted-foreground'>{data.description || 'Sin descripción'}</p>
              </div>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div>
                  <span className='text-muted-foreground'>Duración:</span>
                  <p className='font-medium'>{data.duration}</p>
                </div>
                <div>
                  <span className='text-muted-foreground'>Intensidad:</span>
                  <p className='font-medium'>{getIntensityLabel(data.intensity)}</p>
                </div>
                <div className='col-span-2'>
                  <span className='text-muted-foreground'>Ruta:</span>
                  <p className='font-medium'>{data.route || 'No especificada'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Descripción</h4>
                <p className='text-sm text-muted-foreground'>{data.description || 'Sin descripción'}</p>
              </div>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div>
                  <span className='text-muted-foreground'>Tipo:</span>
                  <p className='font-medium'>{data.type}</p>
                </div>
                <div>
                  <span className='text-muted-foreground'>Cantidad:</span>
                  <p className='font-medium'>{data.amount}</p>
                </div>
                <div>
                  <span className='text-muted-foreground'>Marca:</span>
                  <p className='font-medium'>{data.brand || 'No especificada'}</p>
                </div>
                <div className='col-span-2'>
                  <span className='text-muted-foreground'>Información nutricional:</span>
                  <p className='font-medium'>{data.nutritionalInfo || 'No especificada'}</p>
                </div>
              </div>
              {data.instructions && (
                <div className='space-y-2 border-t pt-2'>
                  <h4 className='font-medium'>Instrucciones</h4>
                  <p className='text-sm text-muted-foreground'>{data.instructions}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>

    <ConfirmationDialog
      isOpen={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
      onConfirm={handleDelete}
      title='Eliminar'
      description='¿Estás seguro de que quieres eliminar los datos seleccionados?'
      isDeleting={true}
    />
    </>
  )
}

