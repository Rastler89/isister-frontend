import { User, Lock, MapPin } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

export const ProfilePage = () => {
    return (
        <div className='main-h-screen flex flex-col bg-green-50/30'>
            <main className='flex-1 container max-w-4xl mx-auto py-8 px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold'>Mi Perfil</h1>
                    <p className='text-muted-foreground'>Gestiona tu información personal y preferencias</p>
                </div>
                <Tabs defaultValue='personal' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-2 lg:w-[400px]'>
                        <TabsTrigger value='personal' className='flex items-center gap-2'>
                            <User className='h-4 w-4' />
                            Información personal
                        </TabsTrigger>
                        <TabsTrigger value='security' className='flex items-center gap-2'>
                            <Lock className='h-4 w-4' />
                            Seguridad
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='personal'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <MapPin className='h-4 w-4' />
                                    Dirección
                                </CardTitle>
                                <CardDescription>Actualiza tu dirección de contacto</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddressUpdate} className='space-y-4'>
                                    <div className='grid gap-4 md:grid-cols-6'>
                                        <div className='md:col-span-4'>
                                            
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default ProfilePage