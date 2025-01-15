import Link from "next/link"

export const Footer = () => {
    return (
        <footer className='border-t border-green-100 bg-white'>
            <div className='container mx-auto px-4 md:px-6 py-8'>
                <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Información</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href='/terms' className='text-muted-foreground hover:text-green-600'>Condiciones de Uso</Link>
                            </li>
                            <li>
                                <Link href='/privacy' className='text-muted-foreground hover:text-green-600'>Política de privacidad</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='mailto:info@isister.org' className='text-muted-foreground hover:text-green-600'>
                                    info@isister.org
                                </a>
                            </li>
                            <li className='text-muted-foreground'>
                                Lunes a Viernes: 9:00 - 18:00
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>Síguenos</h3>
                        <div className='flex space-x-4'>
                            <a href='#' className='text-muted-foreground hover:text-green-600'>
                                link
                            </a>
                        </div>
                    </div>
                </div>
                <div className='mt-8 pt-8 border-t border-green-100'>
                    <p className='text-center text-muted-foreground'>
                        © 2024 Isister. Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    )
}