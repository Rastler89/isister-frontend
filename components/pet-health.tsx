'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { AlertCircle, Apple, Camera, Dog, Edit2, Footprints, Link, Plus, QrCode, Save, Scale, Share2, Stethoscope, Syringe, X } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { WeightChart } from './weight-chart'
import { ImageUploadModal } from './image-upload-modal'
import { AddRecordModal } from './add-record-modal'
import { ConfirmationDialog } from './confirmation-dialog'
import { EditScheduleModal } from './edit-schedule-modal'
import Pet from '../interfaces/Pet'
import { petService } from '../services/petService'
import Severity from './severity'
import { EditRecordModal } from './edit-record-modal'
import { toast } from '../hooks/useToast'
import { ScheduleDetailDialog } from './schedule-detail-dialog'
import { QRCodeModal } from './qr-code-modal'

interface PetHealthProps {
    id: string
}

const PetHealthTracker = ({id}: PetHealthProps) => {
    const [pet, setPet] = useState<Pet>()
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [typeMedicalTest, setTypeMedicalTest] = useState<string[]>([])
    const [qrModalOpen, setQrModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'vaccine' | 'health' | 'walk' | 'meal' | 'weight' | 'allergy' | 'visits' | 'treatments' | 'surgeries' | 'tests'>(
      'allergy',
    )

    useEffect(() => {
            const fetchPet = async () => {
                setLoading(true)
                try {
                    const petDetails = await petService.getPetDetails(id)
                    setPet(petDetails as Pet)
                } catch(error:any) {
                    console.error(error.message)
                } finally {
                    setLoading(false)
                }
            } 
            const fetchMedicalTest = async () => {
              try {
                const response = await petService.getTypeMedical()
                if(response) {
                  setTypeMedicalTest(response)
                  console.log('types',response)
                }
              } catch (error) {
                console.error(error)
              }
            }  
            fetchPet()
            fetchMedicalTest()
        }, [])
  
    const [tempPetData, setTempPetData] = useState({ birthDate: '', character: '' })
  
    const handleEdit = () => {
        setTempPetData({birthDate: String(pet?.birth || ''), character: String(pet?.character || '')}) // Guardar una copia temporal de los datos
        setIsEditing(true)
    }
  
    const handleSave = () => {
        setShowSaveDialog(true)
    }
  
    const handleConfirmSave = async () => {
      try {
        const response = await petService.putMoreDetails(id,{birth: tempPetData.birthDate, character: tempPetData.character})

        setPet(pet ? {...pet, birth: tempPetData.birthDate, character: tempPetData.character} : pet)
        setIsEditing(false)
        setShowSaveDialog(false)

      } catch(error) {
        console.error(error)
      }
    }
  
    const handleCancel = () => {
        setPet(pet ? {...pet, birth: tempPetData.birthDate, character: tempPetData.character} : pet)
        setIsEditing(false)
    }
  
    const openAddModal = (type: typeof modalType) => {
        setModalType(type)
        setAddModalOpen(true)
    }

  
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
  
    const [editScheduleModalOpen, setEditScheduleModalOpen] = useState(false)
    const [editScheduleType, setEditScheduleType] = useState<'walk' | 'meal'>('walk')
    const [editScheduleData, setEditScheduleData] = useState({
      DayOfWeek: 'Lunes',
      time: '08:00',
      duration: '30 min',
      type: '',
      amount: '',
    })
    const [selectedSchedule, setSelectedSchedule] = useState<{
      type: "walk" | "meal"
      data: any
    } | null>(null)

    const handleDeleteSchedule = async (id:any,day:any,time:any) => {
        try {
          if(selectedSchedule && selectedSchedule.type === "walk") {
            const response = await petService.deleteWalk(id,day,time)
          } else {
            const response = await petService.deleteMeal(id,day,time)
          }
          
        } catch(error) {
          console.error(error)
        }

        handleSaveModal
      }
  
    const handleEditSchedule = (type: "walk" | "meal", data: any) => {
      setEditScheduleType(type)
      setEditScheduleData(data)
      setEditScheduleModalOpen(true)
    }

    const handleScheduleClick = (type: "walk" | "meal", data: any) => {
      setSelectedSchedule({ type, data })
    }
  
    const handleSaveSchedule = (data: any) => {
      handleSaveModal
    }

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalData, setEditModalData] = useState<any>(null)

    const handleEditElement = (type: "vaccine" | "health" | "allergy", data: any) => {
      setModalType(type)
      setEditModalData(data)
      setEditModalOpen(true)
    }

    const handleSaveModal = async (data: any,isEdit:boolean) => {
      setLoading(true)
      try {
          const petDetails = await petService.getPetDetails(id)
          setPet(petDetails as Pet)
      } catch(error:any) {
          console.error(error.message)
      } finally {
          setLoading(false)
      }
    }

    if (loading) {
      return null
    }

    const renderScheduleCell = (type: 'walk' | 'meal', item: any) => {
      return (
        <Badge
          variant='outline'
          className='cursor-pointer hover:bg-green-100'
          onClick={(e) => {
            e.preventDefault()
            handleScheduleClick(type, item)
          }}
        >
          {type === 'walk' ? item.duration : item.amount}
        </Badge>
      )
    }

    const filteredConstants = pet?.constants.filter((item:any) => item.type === 2); //PESO
  
    return (
      <div className='container mx-auto p-4 md:p-6 max-w-5xl'>
        <Card className='mb-6 border-green-100'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle className='flex items-center gap-2'>
                <Dog className='h-6 w-6' />
                Perfil de la Mascota
              </CardTitle>
              <div className='flex gap-2'>
                {isEditing ? (
                  <>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={handleCancel}
                      className='text-red-600 hover:text-red-700 hover:bg-red-50'
                    >
                      <X className='h-5 w-5' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={handleSave}
                      className='text-green-600 hover:text-green-700 hover:bg-green-50'
                    >
                      <Save className='h-5 w-5' />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={handleEdit}
                    className='text-green-600 hover:text-green-700 hover:bg-green-50'
                  >
                    <Edit2 className='h-5 w-5' />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='flex flex-col items-center gap-4'>
                <div className='relative'>
                  <Avatar className='h-40 w-40'>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${pet?.image}`} alt='Foto de la mascota' />
                    <AvatarFallback>
                      <Dog className='h-20 w-20' />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size='icon'
                    className='absolute bottom-0 right-0 rounded-full'
                    onClick={() => setImageModalOpen(true)}
                  >
                    <Camera className='h-4 w-4' />
                  </Button>
                </div>
                <div className='text-center'>
                  <h3 className='text-2xl font-semibold'>{pet?.name}</h3>
                  <p className='text-muted-foreground'>{pet?.breed_es}</p>
                  <div className='flex gap-2 mt-2 justify-center'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-green-600 border-green-200 hover:bg-green-50'
                      onClick={() => setQrModalOpen(true)}
                    >
                      <QrCode className='mr-2 h-4 w-4' /> Código QR
                    </Button>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='birth'>Fecha de nacimiento</Label>
                  <Input
                    id='birth'
                    type='date'
                    value={isEditing ? tempPetData.birthDate : pet?.birth}
                    onChange={(e) => setTempPetData({ ...tempPetData, birthDate: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='character'>Carácter</Label>
                  <Textarea
                    id='character'
                    value={isEditing ? tempPetData.character : pet?.character}
                    onChange={(e) => setTempPetData({ ...tempPetData, character: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  
        <Tabs defaultValue='vaccines' className='space-y-4'>
          <TabsList className='grid grid-cols-2 md:grid-cols-6 gap-2 bg-green-50'>
            <TabsTrigger value='allergies' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <AlertCircle className='h-4 w-4' />
              Alergias
            </TabsTrigger>
            <TabsTrigger value='vaccines' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <Syringe className='h-4 w-4' />
              Vacunas
            </TabsTrigger>
            <TabsTrigger value='health' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <Stethoscope className='h-4 w-4' />
              Salud
            </TabsTrigger>
            <TabsTrigger value='walks' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <Footprints className='h-4 w-4' />
              Paseos
            </TabsTrigger>
            <TabsTrigger value='meals' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <Apple className='h-4 w-4' />
              Comidas
            </TabsTrigger>
            <TabsTrigger value='weight' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
              <Scale className='h-4 w-4' />
              Peso
            </TabsTrigger>
          </TabsList>

          <TabsContent value='allergies'>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Registro de Alergias</CardTitle>
                  <CardDescription>Control de alergias y reacciones adversas</CardDescription>
                </div>
                <Button className='mt-4 bg-green-600 hover:bg-green-700' onClick={() => openAddModal('allergy')}>
                  <Plus className='mr-2 h-4 w-4' /> Añadir Alergia
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alérgeno</TableHead>
                        <TableHead>Severidad</TableHead>
                        <TableHead>Síntomas</TableHead>
                        <TableHead>Fecha diagnóstico</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pet?.allergies.map((allergy,index) => (
                        <TableRow key={index}>
                        <TableCell>{allergy.name}</TableCell>
                        <TableCell>{/*TODO gravedades*/}
                          <Severity level={allergy.severity} />
                        </TableCell>
                        <TableCell>{allergy.description}</TableCell>
                        <TableCell>
                          {new Date(allergy.created_at).toLocaleString("es-ES", { year: "2-digit", month: "long", day: "numeric",})}
                        </TableCell>
                        <TableCell>
                          <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditElement("allergy", allergy)}
                            >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value='vaccines'>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Registro de Vacunas</CardTitle>
                  <CardDescription>Mantén un registro de las vacunas y sus fechas de renovación</CardDescription>
                </div>
                <Button className='mt-4 bg-green-600 hover:bg-green-700' onClick={() => openAddModal('vaccine')}>
                  <Plus className='mr-2 h-4 w-4' /> Añadir Vacuna
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[400px] w-full rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Vacuna</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Enfermedades</TableHead>
                        <TableHead>Próxima Dosis</TableHead>
                        <TableHead>Veterinario</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pet?.vaccines.map((vaccine, index) => (
                        <TableRow key={index}>
                          <TableCell>{vaccine.application}</TableCell>
                          <TableCell>{vaccine.name}</TableCell>
                          <TableCell>{vaccine.lot}</TableCell>
                          <TableCell>{vaccine.disease.map((disease) => disease.name_es).join(', ')}</TableCell>
                          <TableCell>{vaccine.next}</TableCell>
                          <TableCell>{vaccine.vcode}</TableCell>
                          <TableCell>
                            <Badge
                              variant={new Date(vaccine.next) > new Date() ? 'default' : 'destructive'}
                              className={
                                new Date(vaccine.next) > new Date()
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : ''
                              }
                            >
                              {new Date(vaccine.next) > new Date() ? 'Vigente' : 'Vencida'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value='health'>
            <Card>
              <CardHeader>
                <CardTitle>Historial Médico</CardTitle>
                <CardDescription>Registro de visitas al veterinario y problemas de salud</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='visits' className='space-y-4'>
                  <TabsList className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                      <TabsTrigger value='visits' className='text-xs md:text-sm'>Visitas Veterinarias</TabsTrigger>
                      <TabsTrigger value='treatments' className='text-xs md:text-sm'>Tratamientos</TabsTrigger>
                      <TabsTrigger value='surgeries' className='text-xs md:text-sm'>Operaciones</TabsTrigger>
                      <TabsTrigger value='tests' className='text-xs md:text-sm'>Pruebas Médicas</TabsTrigger>
                  </TabsList>

                  <TabsContent value='visits'>
                    <Button className='mt-4 mb-4 w-full bg-green-600 hover:bg-green-700' onClick={() => openAddModal('visits')}>
                      <Plus className='mr-2 h-4 w-4' /> Añadir visita
                    </Button>
                    <ScrollArea className='h-[300px] w-full rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pet?.vetvisits.map((visit:any, index:number) => (
                            <TableRow key={index}>
                              <TableCell>{visit.date}</TableCell>
                              <TableCell>{visit.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value='treatments'>
                  <Button className='mt-4 mb-4 w-full bg-green-600 hover:bg-green-700' onClick={() => openAddModal('treatments')}>
                      <Plus className='mr-2 h-4 w-4' /> Añadir tratamiento
                    </Button>
                    <ScrollArea className='h-[300px] w-full rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Inicio</TableHead>
                            <TableHead>Fin</TableHead>
                            <TableHead>Repetición</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pet?.treatments.map((treatment:any, index:number) => (
                            <TableRow key={index}>
                              <TableCell>{treatment.start}</TableCell>
                              <TableCell>{treatment.end}</TableCell>
                              <TableCell>{treatment.repetition}</TableCell>
                              <TableCell>{treatment.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value='surgeries'>
                  <Button className='mt-4 mb-4 w-full bg-green-600 hover:bg-green-700' onClick={() => openAddModal('surgeries')}>
                      <Plus className='mr-2 h-4 w-4' /> Añadir operación
                    </Button>
                    <ScrollArea className='h-[300px] w-full rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Pre-operatorio</TableHead>
                            <TableHead>Resultado</TableHead>
                            <TableHead>Complicaciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pet?.surgeries.map((surgery:any, index:number) => (
                            <TableRow key={index}>
                              <TableCell>{surgery.date}</TableCell>
                              <TableCell>{surgery.description}</TableCell>
                              <TableCell>{surgery.preop}</TableCell>
                              <TableCell>{surgery.result}</TableCell>
                              <TableCell>{surgery.complications}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value='tests'>
                  <Button className='mt-4 mb-4 w-full bg-green-600 hover:bg-green-700' onClick={() => openAddModal('tests')}>
                      <Plus className='mr-2 h-4 w-4' /> Añadir prueba médica
                    </Button>
                    <ScrollArea className='h-[300px] w-full rounded-md border'>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pet?.medicaltests.map((test:any, index:number) => (
                            <TableRow key={index}>
                              <TableCell>{test.date}</TableCell>
                              <TableCell>{test.type}</TableCell>
                              <TableCell>{test.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value='walks'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                <div>
                  <CardTitle>Horario de Paseos</CardTitle>
                  <CardDescription>Programa semanal de paseos</CardDescription>
                </div>
                <Button className='mt-4 bg-green-600 hover:bg-green-700' onClick={() => openAddModal('walk')}>
                  <Plus className='mr-2 h-4 w-4' /> Programar Paseo
                </Button>
              </CardHeader>
              <CardContent>
                <div className='rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[100px]'>Hora</TableHead>
                        {days.map((day) => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((time) => (
                        <TableRow key={time}>
                          <TableCell className='font-medium'>{time}</TableCell>
                          {days.map((day) => {
                            const walk = pet?.scheduleWalks.find((w) => w.day === day && w.time === time)
                            return (
                              <TableCell key={`${day}-${time}`}>
                                {walk && renderScheduleCell('walk',walk)}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value='meals'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                <div>
                  <CardTitle>Horario de Comidas</CardTitle>
                  <CardDescription>Programa diario de alimentación</CardDescription>
                </div>
                <Button className='mt-4 bg-green-600 hover:bg-green-700' onClick={() => openAddModal('meal')}>
                  <Plus className='mr-2 h-4 w-4' /> Programar Comida
                </Button>
              </CardHeader>
              <CardContent>
                <div className='rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[100px]'>Hora</TableHead>
                        {days.map((day) => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((time) => (
                        <TableRow key={time}>
                          <TableCell className='font-medium'>{time}</TableCell>
                          {days.map((day) => {
                            const meal = pet?.scheduleDiets.find(
                              (m) => (m.day === day || m.day === 'Todos') && m.time.split(':')[0] === time.split(':')[0],
                            )
                            return (
                              <TableCell key={`${day}-${time}`}>
                                {meal && renderScheduleCell('meal',meal)}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value='weight'>
            <Card>
              <CardHeader>
                <CardTitle>Control de Peso</CardTitle>
                <CardDescription>Seguimiento y tendencia del peso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-[300px] w-full'>
                  <WeightChart data={filteredConstants} />
                </div>
                <Button className='mt-4 w-full bg-green-600 hover:bg-green-700' onClick={() => openAddModal('weight')}>
                  <Plus className='mr-2 h-4 w-4' /> Añadir Peso
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
  
        <ImageUploadModal
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          petId={String(pet?.id)}
          onUpload={(image) => {
            // Aquí iría la lógica para actualizar la imagen
          }}
        />
  
        <AddRecordModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={() => handleSaveModal(editModalData, false)}
          type={modalType}
          id={pet?.id || 0}
          diseases={pet?.diseases}
          typesMedical={typeMedicalTest}
        />
        <ConfirmationDialog
          isOpen={showSaveDialog}
          onClose={() => setShowSaveDialog(false)}
          onConfirm={handleConfirmSave}
          title='Guardar cambios'
          description='¿Estás seguro de que quieres guardar los cambios realizados en el perfil?'
        />
        <EditScheduleModal
          isOpen={editScheduleModalOpen}
          onClose={() => setEditScheduleModalOpen(false)}
          onSave={handleSaveSchedule}
          type={editScheduleType}
          initialData={editScheduleData}
        />
        {selectedSchedule && (
          <ScheduleDetailDialog
            isOpen={!!selectedSchedule}
            onClose={() => setSelectedSchedule(null)}
            onEdit={() => {
              handleEditSchedule(selectedSchedule.type, selectedSchedule.data)
              setSelectedSchedule(null)
            }}
            onDelete={(id:any,day:any,time:any) => handleDeleteSchedule(id,day,time)}
            type={selectedSchedule.type}
            data={selectedSchedule.data}
            id={pet?.id || 0}
          />
        )}
        {editModalOpen && (
          <EditRecordModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={() => handleSaveModal(editModalData, true)}
            type={modalType}
            initialData={editModalData}
            id={pet?.id || 0}
            diseases={pet?.diseases}
            />
        )}
        <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        petData={pet}
      />
      </div>
    )
}

export default PetHealthTracker