import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Clipboard, FootprintsIcon, Heart, Scissors, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <section
        className='relative bg-cover bg-center bg-no-repeat min-h-[50vh] flex items-center justify-center'
      >
        <Image
          src='/img/catai.png'
          alt='Imagen de fondo'
          layout='fill'
          objectFit='cover'
          priority
        />
        <div className='absolute inset-0 bg-black/50'></div> {/* Overlay para oscurecer la imagen */}
        <div className='relative text-center text-white px-4'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Cuida la salud y felicidad de tu mascota
          </h2>
          <p className='text-lg md:text-xl mb-6'>
            Gestiona datos de salud, dietas, paseos y cuidados.
          </p>
          <Link href='/auth/register'>
            <Button className='bg-green-600 hover:bg-green-700 text-white'>
                Comienza gratis
            </Button>
          </Link>
        </div>
      </section>

      <section className='py-24 bg-green-50/50'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='text-center mb-12'>
            <Badge className='mb-4 bg-green-100 text-green-700 hover:bg-green-100'>
              Beneficios
            </Badge>
            <h2 className='text-3xl font-bold tracking-tight'>
              Todo lo que necesitas para cuidar a tu mascota
            </h2>
          </div>
          
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <Card className='border-green-100 hover:border-green-200 transition-all hover:shadow-lg'>
              <CardHeader>
                <Clipboard className='w-10 h-10 text-green-600 mb-4' />
                <CardTitle>Registro completo de salud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Mantén un historial detallado de las visitas al veterinario, vacunas, medicamentos y alergias.
                </p>
              </CardContent>
            </Card>

            <Card className='border-green-100 hover:border-green-200 transition-all hover:shadow-lg'>
              <CardHeader>
                <UtensilsCrossed className='w-10 h-10 text-green-600 mb-4' />
                <CardTitle>Planificadores de dieta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Crea planes de alimentación personalizados para las necesidades de tu mascota.
                </p>
              </CardContent>
            </Card>

            <Card className='border-green-100 hover:border-green-200 transition-all hover:shadow-lg'>
              <CardHeader>
                <FootprintsIcon className='w-10 h-10 text-green-600 mb-4' />
                <CardTitle>Registro de paseos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Registra la duración, distancia y ubicación de los paseos de tu mascota
                </p>
              </CardContent>
            </Card>

            <Card className='border-green-100 hover:border-green-200 transition-all hover:shadow-lg'>
              <CardHeader>
                <Scissors className='w-10 h-10 text-green-600 mb-4' />
                <CardTitle>Cuidados generales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  LLeva un registro de los baños, cepillados, cortes de uñas y otros cuidados de tu mascota
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='py-24 bg-gradient-to-b from-white to-green-50/50'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='text-center mb-12'>
            <Badge className='mb-4 bg-green-100 text-green-700 hover:bg-green-100'>
              Testimonios
            </Badge>
            <h2 className='text-3xl font-bold tracking-tight'>
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <Heart className="w-8 h-8 text-green-600 mr-2 mt-1" />
                  <blockquote className="text-lg">
                    "¡Me encanta esta aplicación! Me ha ayudado a mantener a mi perro sano y feliz."
                    <footer className="mt-2 text-sm text-muted-foreground">
                      — Ana Pérez
                    </footer>
                  </blockquote>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <Heart className="w-8 h-8 text-green-600 mr-2 mt-1" />
                  <blockquote className="text-lg">
                    "Esta aplicación es muy fácil de usar y me ha ahorrado mucho tiempo."
                    <footer className="mt-2 text-sm text-muted-foreground">
                      — Juan López
                    </footer>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
