import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Separator } from '../../components/ui/separator'

export const PrivacyPage = () => {
    return (
        <div className='min-h-screen flex flex-col bg-green-50/30'>
            <main className='flex-1 container max-w-4xl mx-auto py-8 px-4'>
                <div className='mb-6'>
                    <Link href='/' className='flex items-center text-green-600 hover:text-green-700 mb-4'>
                        <ArrowLeft className='mr-2 h-4 w-4' />
                        Volver al inicio
                    </Link>
                    <h1 className='text-3xl font-bold flex items-center gap-2'>
                        <Shield className='h-6 w--6' />
                        Política de privacidad
                    </h1>
                    <p className='text-muted-foreground mt-2'>Última actualización: 1 de abril de 2024</p>
                </div>
                <Card className='border-green-100'>
                    <CardHeader>
                        <CardTitle>Política de Privacidad de Isister</CardTitle>
                        <CardDescription>
                            Tu privacidad es importante para nostros. Esta política explica cómo recopilamos, usamos y protegemos tus datos personales.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className='h-[500px] pr-4'>
                            <div className='space-y-6'>
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>1. Introducción</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        En Isister, nos comprometemos a proteger tu privacidad y a cumplir con todas las leyes y regulaciones aplicables, incluido el Reglamento General de Protección de Datos (RGPD) de la UE.
                                    </p>
                                    <p className='text-muted-foreground mb-2'>
                                        Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando utilizas nuestra plataforma. Al utilizar Isister, aceptas las prácticas descritas en esta política.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>2. Información que Recopilamos</h2>
                                    <p className='text-muted-foreground mb-2'>Podemos recopilar los siguientes tipos de información:</p>
                                    <h3 className='text-lg font-medium mt-3 mb-2'>2.1 Información Personal</h3>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Información de registro: nombre, dirección de correo electrónico, contraseña.</li>
                                        <li>Información de perfil: número de teléfono, dirección postal, foto de perfil (opcional).</li>
                                        <li>
                                        Información de pago: si te suscribes a servicios premium (procesada por nuestros proveedores de
                                        pago seguros).
                                        </li>
                                    </ul>

                                    <h3 className='text-lg font-medium mt-3 mb-2'>2.2 Información sobre tus Mascotas</h3>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Datos básicos: nombre, especie, raza, edad, sexo, peso.</li>
                                        <li>Información médica: historial de vacunas, medicamentos, alergias, condiciones médicas.</li>
                                        <li>Fotos e imágenes de tus mascotas.</li>
                                    </ul>

                                    <h3 className='text-lg font-medium mt-3 mb-2'>2.3 Información de Uso</h3>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Datos de registro: dirección IP, tipo de navegador, páginas visitadas, tiempo de acceso.</li>
                                        <li>
                                        Información del dispositivo: tipo de dispositivo, sistema operativo, identificadores únicos.
                                        </li>
                                        <li>
                                        Cookies y tecnologías similares para mejorar tu experiencia y analizar el uso de nuestra
                                        plataforma.
                                        </li>
                                    </ul>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>3. Cómo Utilizamos tu Información</h2>
                                    <p className='text-muted-foreground mb-2'>Utilizamos la información recopilada para:</p>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
                                        <li>Procesar y completar transacciones.</li>
                                        <li>Enviar información técnica, actualizaciones, alertas de seguridad y mensajes de soporte.</li>
                                        <li>Responder a tus comentarios, preguntas y solicitudes.</li>
                                        <li>Desarrollar nuevos productos y servicios.</li>
                                        <li>Monitorear y analizar tendencias, uso y actividades relacionadas con nuestros servicios.</li>
                                        <li>Detectar, investigar y prevenir actividades fraudulentas y no autorizadas.</li>
                                        <li>Personalizar y mejorar tu experiencia en nuestra plataforma.</li>
                                    </ul>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>4. Compartir tu Información</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu información en
                                        las siguientes circunstancias:
                                    </p>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>
                                        Con proveedores de servicios que trabajan en nuestro nombre para proporcionar servicios
                                        relacionados con nuestra plataforma (como alojamiento, análisis, procesamiento de pagos).
                                        </li>
                                        <li>
                                        Si eliges compartir información específica con veterinarios u otros profesionales a través de
                                        nuestra plataforma.
                                        </li>
                                        <li>Para cumplir con la ley, regulaciones, procesos legales o solicitudes gubernamentales.</li>
                                        <li>
                                        En caso de fusión, venta de activos de la empresa, financiación o adquisición de todo o parte de
                                        nuestro negocio por otra empresa.
                                        </li>
                                        <li>Con tu consentimiento o según tus instrucciones.</li>
                                    </ul>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>5. Seguridad de los Datos</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger la
                                        información personal que recopilamos. Sin embargo, ningún sistema de seguridad es impenetrable y no
                                        podemos garantizar la seguridad absoluta de tu información.
                                    </p>
                                    <p className='text-muted-foreground mb-2'>Algunas de nuestras medidas de seguridad incluyen:</p>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Encriptación de datos sensibles.</li>
                                        <li>Acceso restringido a la información personal.</li>
                                        <li>Monitoreo regular de nuestros sistemas para detectar posibles vulnerabilidades.</li>
                                        <li>Formación de nuestro personal en prácticas de seguridad de datos.</li>
                                    </ul>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>6. Tus Derechos y Opciones</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Dependiendo de tu ubicación, puedes tener ciertos derechos relacionados con tu información personal,
                                        incluyendo:
                                    </p>
                                    <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                                        <li>Acceder a tu información personal.</li>
                                        <li>Corregir datos inexactos o incompletos.</li>
                                        <li>Eliminar tu información personal.</li>
                                        <li>Restringir u oponerte al procesamiento de tus datos.</li>
                                        <li>Solicitar la portabilidad de tus datos.</li>
                                        <li>
                                        Retirar tu consentimiento en cualquier momento (cuando el procesamiento se base en el
                                        consentimiento).
                                        </li>
                                    </ul>
                                    <p className='text-muted-foreground mt-2'>
                                        Para ejercer estos derechos, por favor contáctanos utilizando la información proporcionada al final
                                        de esta política.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>7. Retención de Datos</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Conservamos tu información personal durante el tiempo necesario para cumplir con los propósitos
                                        descritos en esta política, a menos que la ley exija o permita un período de retención más largo.
                                        Cuando ya no necesitemos usar tu información, la eliminaremos o anonimizaremos de manera segura.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>8. Transferencias Internacionales de Datos</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Podemos transferir, almacenar y procesar tu información en países distintos al tuyo. Cuando lo
                                        hagamos, nos aseguraremos de que existan salvaguardas adecuadas para proteger tu información y
                                        cumplir con las leyes de protección de datos aplicables.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>9. Menores</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Nuestros servicios no están dirigidos a personas menores de 16 años. No recopilamos a sabiendas
                                        información personal de niños menores de 16 años. Si eres padre o tutor y crees que tu hijo nos ha
                                        proporcionado información personal, por favor contáctanos para que podamos tomar las medidas
                                        necesarias.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>10. Cambios a esta Política</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras
                                        prácticas o por otros motivos operativos, legales o regulatorios. Te notificaremos cualquier cambio
                                        material publicando la nueva Política de Privacidad en nuestra plataforma y, cuando sea apropiado,
                                        te enviaremos una notificación directa.
                                    </p>
                                </section>
                                <Separator className='my-4' />
                                <section>
                                    <h2 className='text-xl font-semibold mb-3'>11. Contacto</h2>
                                    <p className='text-muted-foreground mb-2'>
                                        Si tienes preguntas, comentarios o inquietudes sobre esta Política de Privacidad o nuestras
                                        prácticas de datos, por favor contáctanos en:
                                    </p>
                                    <p className='text-muted-foreground'>
                                        <strong>Email:</strong> info@isister.org
                                    </p>
                                </section>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default PrivacyPage