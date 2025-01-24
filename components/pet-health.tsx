'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Apple, Camera, Dog, Footprints, Plus, Scale, Stethoscope, Syringe } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ScrollArea } from './ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { WeightChart } from './weight-chart'
import Pet from '../interfaces/Pet'

interface PetHealthProps {
    id: string
}

const PetHealthTracker = ({id}: PetHealthProps) => {

    const [records, setRecords] = useState({
        vaccines: [
          { date: '2024-01-05', name: 'Rabia', nextDue: '2025-01-05' },
          { date: '2023-12-15', name: 'Parvovirus', nextDue: '2024-06-15' },
        ],
        health: [
          { date: '2024-01-10', issue: 'Revisión general', notes: 'Todo bien' },
          { date: '2023-12-20', issue: 'Dolor en pata', notes: 'Esguince leve' },
        ],
        walks: [
          { day: 'Lunes', time: '08:00', duration: '30 min' },
          { day: 'Lunes', time: '19:00', duration: '45 min' },
          { day: 'Martes', time: '08:00', duration: '30 min' },
          { day: 'Martes', time: '19:00', duration: '45 min' },
          { day: 'Miércoles', time: '08:00', duration: '30 min' },
          { day: 'Miércoles', time: '19:00', duration: '45 min' },
        ],
        meals: [
          { day: 'Todos', time: '08:30', type: 'Pienso', amount: '200g' },
          { day: 'Todos', time: '20:30', type: 'Pienso', amount: '200g' },
        ],
        weights: [
          { date: '2024-01-01', weight: 12.5 },
          { date: '2023-12-15', weight: 12.3 },
          { date: '2023-12-01', weight: 12.2 },
          { date: '2023-11-15', weight: 12.0 },
          { date: '2023-11-01', weight: 11.8 },
          { date: '2023-10-15', weight: 11.5 },
        ]
    })
    const [pet, setPet] = useState<Pet>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPet = async () => {
            setLoading(true)
            try {
                let url = ''
                if(id!==undefined) {
                    url = `http://localhost/api/pets/${id}`
                 

                    const response = await fetch(url, {
                        cache: 'no-store',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                

                    if(!response.ok) {
                        throw new Error('Error en la petición')
                    }
                    const data = await response.json()
                    setPet(data)
                }
            } catch(error:any) {
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPet()
    }, [])

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    const timeSlots = Array.from({ length: 24 }, (_, i) => 
        `${String(i).padStart(2, '0')}:00`
    )
    
    if(loading) {
        return <div className='container mx-auto p-4 md:p-6 max-w-5xl'>Cargando...</div>
    } else {

        return (
            <div className='container mx-auto p-4 md:p-6 max-w-5xl'>
                <Card className='mb-6 border-green-100'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Dog className='h-6 w-6' />
                            Perfil de la mascota
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-6 md:grid-cols-2'>
                            <div className='flex flex-col items-center gap-4'>
                                <div className='relative'>
                                    <Avatar className='h-40 w-40'>
                                        <AvatarImage src={`http://localhost/storage/${pet?.image}`} alt='' />
                                        <AvatarFallback>
                                            <Dog className='h-20 w-20' />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button size='icon' className='absolute bottom-0 right-0 rounded-full'>
                                        <Camera className='h-4 w-4' />
                                    </Button>
                                </div>
                                <div className='text-center'>
                                    <h3 className='text-2xl font-semibold'>{pet?.name}</h3>
                                    <p className='text-muted-foreground'>{pet?.breed_es}</p>
                                </div>
                            </div>
                            <div className='space-y-4'>
                                <div className='space-y-2'>
                                    <Label htmlFor='birth'>Fecha de nacimiento</Label>
                                    <Input id='birth' type='date' defaultValue={pet?.birth} />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='character'>Carácter</Label>
                                    <Textarea
                                        id='character'
                                        placeholder='Carácter de la mascota'
                                        defaultValue={pet?.character}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue='vaccines' className='space-y-4'>
                    <TabsList className='grid grid-cols-2 md:grid-cols-6 gap-2 bg-green-50'>
                        <TabsTrigger value='vaccines' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
                            <Syringe className='h-4 w-4' />
                            Vacunas
                        </TabsTrigger>
                        <TabsTrigger value='allergies' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
                            <Stethoscope className='h-4 w-4' />
                            Alergias
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
                        <TabsTrigger value='weights' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
                            <Scale className='h-4 w-4' />
                            Peso
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='vaccines'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Registro de Vacunas</CardTitle>
                                <CardDescription>
                                    Mantén un registro de las vacunas y sus fechas de renovación
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className='mb-4 w-full bg-green-600 hover:bg-green-700'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Añadir Vacuna
                                </Button>
                                <ScrollArea className='h-[400px] w-full rounded-md border'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fecha</TableHead>
                                                <TableHead>Vacuna</TableHead>
                                                <TableHead>Próxima</TableHead>
                                                <TableHead>Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {records.vaccines.map((vaccine, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{vaccine.date}</TableCell>
                                                    <TableCell>{vaccine.name}</TableCell>
                                                    <TableCell>{vaccine.nextDue}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={new Date(vaccine.nextDue) > new Date() ? 'default' : 'destructive'}
                                                            className={new Date(vaccine.nextDue) > new Date() ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                                                        >
                                                            {new Date(vaccine.nextDue) > new Date() ? 'Vigente' : 'Vencida'}
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
                            <CardDescription>
                                Registro de visitas al veterinario y problemas de salud
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ScrollArea className='h-[400px] w-full rounded-md border'>
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Notas</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {records.health.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.issue}</TableCell>
                                        <TableCell>{record.notes}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </ScrollArea>
                            <Button className='mt-4 w-full bg-green-600 hover:bg-green-700'>
                                <Plus className='mr-2 h-4 w-4' /> Añadir Registro
                            </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='walks'>
                        <Card>
                            <CardHeader>
                            <CardTitle>Horario de Paseos</CardTitle>
                            <CardDescription>
                                Programa semanal de paseos
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div className='rounded-md border'>
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className='w-[100px]'>Hora</TableHead>
                                    {days.map(day => (
                                        <TableHead key={day}>{day}</TableHead>
                                    ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {timeSlots.map(time => (
                                    <TableRow key={time}>
                                        <TableCell className='font-medium'>{time}</TableCell>
                                        {days.map(day => {
                                        const walk = records.walks.find(w => w.day === day && w.time === time)
                                        return (
                                            <TableCell key={`${day}-${time}`}>
                                            {walk && (
                                                <Badge variant='outline'>
                                                {walk.duration}
                                                </Badge>
                                            )}
                                            </TableCell>
                                        )
                                        })}
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </div>
                            <Button className='mt-4 w-full bg-green-600 hover:bg-green-700'>
                                <Plus className='mr-2 h-4 w-4' /> Programar Paseo
                            </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='meals'>
                        <Card>
                            <CardHeader>
                            <CardTitle>Horario de Comidas</CardTitle>
                            <CardDescription>
                                Programa diario de alimentación
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div className='rounded-md border'>
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className='w-[100px]'>Hora</TableHead>
                                    {days.map(day => (
                                        <TableHead key={day}>{day}</TableHead>
                                    ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {timeSlots.map(time => (
                                    <TableRow key={time}>
                                        <TableCell className='font-medium'>{time}</TableCell>
                                        {days.map(day => {
                                        const meal = records.meals.find(m => 
                                            (m.day === day || m.day === 'Todos') && 
                                            m.time.split(':')[0] === time.split(':')[0]
                                        )
                                        return (
                                            <TableCell key={`${day}-${time}`}>
                                            {meal && (
                                                <Badge variant='outline'>
                                                {meal.amount}
                                                </Badge>
                                            )}
                                            </TableCell>
                                        )
                                        })}
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </div>
                            <Button className='mt-4 w-full bg-green-600 hover:bg-green-700'>
                                <Plus className='mr-2 h-4 w-4' /> Programar Comida
                            </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value='weights'>
                        <Card>
                            <CardHeader>
                            <CardTitle>Control de Peso</CardTitle>
                            <CardDescription>
                                Seguimiento y tendencia del peso
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div className='h-[300px] w-full'>
                                <WeightChart data={records.weights} />
                            </div>
                            <Button className='mt-4 w-full bg-green-600 hover:bg-green-700'>
                                <Plus className='mr-2 h-4 w-4' /> Añadir Peso
                            </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }

}

export default PetHealthTracker