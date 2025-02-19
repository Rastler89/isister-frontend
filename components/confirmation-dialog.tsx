import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'


interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  isDeleting?: boolean
}

export function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description, isDeleting=false }: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          {isDeleting && (
            <AlertDialogAction onClick={onConfirm} className='bg-red-600 hover:bg-red-700'>
              Eliminar
            </AlertDialogAction>
          )}
          {!isDeleting && (
            <AlertDialogAction onClick={onConfirm} className='bg-green-600 hover:bg-green-700'>
              Confirmar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

