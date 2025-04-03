import { notFound } from 'next/navigation'
import { Dog, Cat, Rabbit, Phone, Mail, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar'
import { Badge } from '../../../../components/ui/badge'
import { petService } from '../../../../services/petService'

// Función para obtener el icono según el tipo de mascota
function getPetIcon(type: string) {
  switch (type) {
    case 'dog':
      return Dog
    case 'cat':
      return Cat
    case 'rabbit':
      return Rabbit
    default:
      return Dog
  }
}

// Función para obtener el estilo de la severidad de la alergia
function getSeverityStyle(value: number) {
  switch (value) {
    case 0:
      return 'bg-green-100 text-green-700 hover:bg-green-100'
    case 1:
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
    case 2:
      return 'bg-red-100 text-red-700 hover:bg-red-100'
    case 3:
      return 'bg-purple-100 text-purple-700 hover:bg-purple-100'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
  }
}

// Función para obtener la etiqueta de la severidad
function getSeverityLabel(value: number) {
  switch (value) {
    case 0:
      return 'Leve'
    case 1:
      return 'Moderada'
    case 2:
      return 'Grave'
    case 3:
      return 'Crítica'
    default:
      return 'Desconocida'
  }
}

// Función para obtener la etiqueta del carácter
function getCharacterLabel(value: string) {
  switch (value) {
    case 'friendly':
      return 'Amigable'
    case 'shy':
      return 'Tímido'
    case 'active':
      return 'Activo'
    case 'calm':
      return 'Tranquilo'
    default:
      return value
  }
}

interface PetPageProps {
  params: Promise<{ id: string }>;
}

export const PublicPetProfile = async ({ params }: PetPageProps) => {
  const {id} = await params
  console.log('id', id)
  try {

    const petData = await petService.getPublicPet(id)

    console.log('mascota',petData)

    // const PetIcon = getPetIcon(petData.type)

    return (
      <div className='min-h-screen bg-green-50/30 py-8 px-4'>
        <div className='container mx-auto max-w-2xl'>

          <Card className='border-green-100 shadow-md'>
            <CardHeader>
              <CardTitle className='text-center text-2xl'>Perfil Público de Mascota</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col items-center gap-4'>
                <Avatar className='h-32 w-32'>
                  <AvatarImage src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${petData.image}`} alt={petData.name} />
                  <AvatarFallback>
                    <Dog className='h-20 w-20' />
                  </AvatarFallback>
                </Avatar>
                <div className='text-center'>
                  <h2 className='text-3xl font-bold'>{petData.name}</h2>
                  <p className='text-muted-foreground'>{petData.breed_es}</p>
                </div>
              </div>

              <div className='border-t border-green-100 pt-4'>
                <h3 className='font-semibold text-lg mb-2'>Información básica</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <span className='text-muted-foreground'>Fecha de nacimiento:</span>
                    <p className='font-medium'>{new Date(petData.birth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Carácter:</span>
                    <p className='font-medium'>{getCharacterLabel(petData.character)}</p>
                  </div>
                  {petData.code && (
                    <div>
                      <span className='text-muted-foreground'>Microchip:</span>
                      <p className='font-medium'>{petData.code}</p>
                    </div>
                  )}
                  <div>
                    <span className='text-muted-foreground'>Sexo:</span>
                    <p className='font-medium'>{petData.gender}</p>
                  </div>
                </div>
              </div>

              {/*<div className='border-t border-green-100 pt-4'>
                <h3 className='font-semibold text-lg mb-2'>Información de contacto</h3>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='bg-green-50'>
                      Dueño
                    </Badge>
                    <span>{petData.owner.name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-green-600' />
                    <span>{petData.owner.phone}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-green-600' />
                    <span>{petData.owner.email}</span>
                  </div>
                </div>
              </div>*/}

              {petData.allergies && petData.allergies.length > 0 && (
                <div className='border-t border-green-100 pt-4'>
                  <h3 className='font-semibold text-lg mb-2'>Información médica importante</h3>
                  <div className='space-y-2'>
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <AlertCircle className='h-4 w-4 text-green-600' />
                        <span className='font-medium'>Alergias:</span>
                      </div>
                      <div className='flex flex-wrap gap-2 ml-6'>
                        {petData.allergies.map((allergy, index) => (
                          <Badge key={index} variant='outline' className={getSeverityStyle(allergy.severity)}>
                            {allergy.name} ({getSeverityLabel(allergy.severity)})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {petData.notes && (
                <div className='border-t border-green-100 pt-4'>
                  <h3 className='font-semibold text-lg mb-2'>Notas</h3>
                  <p className='text-muted-foreground'>{petData.notes}</p>
                </div>
              )}

              <div className='border-t border-green-100 pt-4 text-center'>
                <p className='text-sm text-muted-foreground'>
                  Esta información es pública y ha sido compartida por el dueño de la mascota.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error al cargar el perfil de la mascota:', error)
    return notFound()
  }
}

export default PublicPetProfile