
import { FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Separator } from '../../components/ui/separator'

export const TermsPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-orange-50/30'>
      <main className='flex-1 container max-w-4xl mx-auto py-8 px-4'>
        <div className='mb-6'>
          <Link href='/' className='flex items-center text-orange-600 hover:text-orange-700 mb-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver al inicio
          </Link>
          <h1 className='text-3xl font-bold flex items-center gap-2'>
            <FileText className='h-6 w-6' />
            Condiciones de Uso
          </h1>
          <p className='text-muted-foreground mt-2'>Última actualización: 1 de abril de 2024</p>
        </div>

        <Card className='border-orange-100'>
          <CardHeader>
            <CardTitle>Términos y Condiciones de Isister</CardTitle>
            <CardDescription>
              Por favor, lee detenidamente estos términos antes de utilizar nuestra plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className='h-[500px] pr-4'>
              <div className='space-y-6'>
                <section>
                  <h2 className='text-xl font-semibold mb-3'>1. Aceptación de los Términos</h2>
                  <p className='text-muted-foreground mb-2'>
                    Al acceder y utilizar Isister (en adelante, 'la Plataforma'), aceptas estar legalmente
                    vinculado por estos Términos y Condiciones, nuestra Política de Privacidad y todas las leyes y
                    normativas aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar la
                    Plataforma.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>2. Descripción del Servicio</h2>
                  <p className='text-muted-foreground mb-2'>
                    Isister es una plataforma diseñada para ayudar a los propietarios de mascotas a gestionar
                    la salud y el bienestar de sus animales. Ofrecemos herramientas para registrar información médica,
                    programar recordatorios, seguir tratamientos y almacenar datos relevantes sobre tus mascotas.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>3. Registro de Cuenta</h2>
                  <p className='text-muted-foreground mb-2'>
                    Para utilizar ciertas funciones de la Plataforma, deberás crear una cuenta. Al registrarte, aceptas
                    proporcionar información precisa, actual y completa. Eres responsable de mantener la
                    confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    Nos reservamos el derecho de suspender o terminar tu cuenta si detectamos cualquier actividad que
                    viole estos términos o que consideremos perjudicial para la Plataforma o para otros usuarios.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>4. Uso Aceptable</h2>
                  <p className='text-muted-foreground mb-2'>Al utilizar nuestra Plataforma, aceptas no:</p>
                  <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
                    <li>Utilizar la Plataforma de manera que infrinja cualquier ley o regulación aplicable.</li>
                    <li>
                      Publicar o transmitir contenido que sea ilegal, ofensivo, difamatorio, obsceno o que viole los
                      derechos de terceros.
                    </li>
                    <li>Intentar acceder a cuentas o sistemas a los que no tienes autorización.</li>
                    <li>Utilizar la Plataforma para distribuir virus, malware o cualquier otro código malicioso.</li>
                    <li>
                      Interferir con el funcionamiento normal de la Plataforma o sobrecargar deliberadamente nuestros
                      sistemas.
                    </li>
                    <li>Recopilar información de otros usuarios sin su consentimiento.</li>
                  </ul>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>5. Contenido del Usuario</h2>
                  <p className='text-muted-foreground mb-2'>
                    Al subir contenido a la Plataforma (como fotos de mascotas, información médica, etc.), nos otorgas
                    una licencia mundial, no exclusiva, libre de regalías para usar, modificar, ejecutar públicamente,
                    mostrar públicamente y distribuir dicho contenido en relación con los servicios que ofrecemos.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    Eres el único responsable de todo el contenido que publiques y de las consecuencias de compartir
                    dicho contenido. Garantizas que tienes todos los derechos necesarios sobre el contenido que
                    compartes y que no infringe los derechos de terceros.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>6. Propiedad Intelectual</h2>
                  <p className='text-muted-foreground mb-2'>
                    La Plataforma y todo su contenido original, características y funcionalidades son propiedad de Pet
                    Health Tracker y están protegidos por leyes internacionales de derechos de autor, marcas
                    registradas, patentes, secretos comerciales y otros derechos de propiedad intelectual.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    No puedes reproducir, distribuir, modificar, crear obras derivadas, mostrar públicamente, ejecutar
                    públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestra
                    Plataforma, excepto según lo permitido por estos Términos.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>7. Limitación de Responsabilidad</h2>
                  <p className='text-muted-foreground mb-2'>
                    La información proporcionada en la Plataforma es solo para fines informativos generales. No
                    sustituye el consejo profesional veterinario. Siempre debes consultar a un veterinario calificado
                    para el diagnóstico y tratamiento de tus mascotas.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    En ningún caso Isister, sus directores, empleados o agentes serán responsables por
                    cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la
                    imposibilidad de usar la Plataforma.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>8. Modificaciones de los Términos</h2>
                  <p className='text-muted-foreground mb-2'>
                    Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones
                    entrarán en vigor inmediatamente después de su publicación en la Plataforma. Es tu responsabilidad
                    revisar periódicamente estos Términos para estar al tanto de las actualizaciones.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    El uso continuado de la Plataforma después de la publicación de los cambios constituirá tu
                    aceptación de dichos cambios.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>9. Ley Aplicable</h2>
                  <p className='text-muted-foreground mb-2'>
                    Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta
                    sus disposiciones sobre conflictos de leyes.
                  </p>
                  <p className='text-muted-foreground mb-2'>
                    Cualquier disputa relacionada con estos Términos será sometida a la jurisdicción exclusiva de los
                    tribunales de Madrid, España.
                  </p>
                </section>

                <Separator className='my-4' />

                <section>
                  <h2 className='text-xl font-semibold mb-3'>10. Contacto</h2>
                  <p className='text-muted-foreground mb-2'>
                    Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en:
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

export default TermsPage