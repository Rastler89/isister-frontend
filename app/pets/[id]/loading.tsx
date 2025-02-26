import { Dog, Syringe, Stethoscope, Footprints, Apple, Scale, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import Skeleton from '../../../components/ui/skeleton'

export default function LoadingPetProfile() {

  return (
    <div className='min-h-screen flex flex-col bg-green-50/30'>
      <main className='flex-1'>
        <div className='container mx-auto p-4 md:p-6 max-w-5xl'>
          <Card className='mb-6 border-green-100'>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Dog className='h-6 w-6' />
                  <Skeleton className='h-7 w-48' />
                </div>
                <Skeleton className='h-9 w-9' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='flex flex-col items-center gap-4'>
                  <Skeleton className='h-40 w-40 rounded-full' />
                  <div className='text-center space-y-2'>
                    <Skeleton className='h-8 w-32 mx-auto' />
                    <Skeleton className='h-4 w-24 mx-auto' />
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-10 w-full' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-10 w-full' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-36' />
                    <Skeleton className='h-20 w-full' />
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
              <TabsTrigger value='allergies' className='flex items-center gap-2 data-[state=active]:bg-green-100/50'>
                <AlertCircle className='h-4 w-4' />
                Alergias
              </TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-48' />
                  <Skeleton className='h-4 w-72' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='h-[400px] rounded-md border'>
                    <div className='p-4 space-y-4'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className='flex justify-between items-center'>
                          <div className='space-y-2'>
                            <Skeleton className='h-4 w-32' />
                            <Skeleton className='h-3 w-24' />
                          </div>
                          <Skeleton className='h-6 w-20' />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Skeleton className='h-10 w-full' />
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

