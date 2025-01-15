import { Button } from "../components/ui/button";
import Image from 'next/image'

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
          <Button className='bg-green-600 hover:bg-green-700 text-white'>
            Comienza gratis
          </Button>
        </div>
      </section>

      <section className='py-24 bg-green-50/50'>
        <div className='container px-4 md:px-6'>
          <div className='text-center mb-12'>
            
          </div>
        </div>
      </section>
    </div>
  );
}
