'use client'

import { useState, useRef, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Share2, Mail, Copy, QrCode } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import Pet from '../interfaces/Pet'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  petData: Pet
}

export function QRCodeModal({ isOpen, onClose, petData }: QRCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'share'>('qr')
  const qrRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [qrValue, setQrValue] = useState('')

  // Generar la URL pública para el código QR
  useEffect(() => {
    if (isOpen && petData) {
      // Generar una URL pública para el perfil de la mascota
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/public/pet/${petData.hash}`

      // Usar la URL como valor del QR
      setQrValue(publicUrl)
    }
  }, [isOpen, petData])

  const handleDownload = () => {
    if (!qrRef.current) return

    // Crear un canvas a partir del SVG
    const svgElement = qrRef.current.querySelector('svg')
    if (!svgElement) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar el tamaño del canvas
    const svgRect = svgElement.getBoundingClientRect()
    canvas.width = svgRect.width * 2 // Multiplicar por 2 para mejor calidad
    canvas.height = svgRect.height * 2

    // Dibujar un fondo blanco
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Convertir SVG a una imagen
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const img = new Image()
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)

    img.onload = () => {
      // Dibujar la imagen en el canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Convertir canvas a URL de datos
      const dataUrl = canvas.toDataURL('image/png')

      // Crear un enlace de descarga
      const link = document.createElement('a')
      link.download = `${petData.name}-qr-code.png`
      link.href = dataUrl
      link.click()

      toast({
        title: 'QR descargado',
        description: `El código QR de ${petData.name} se ha descargado correctamente.`,
      })
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      // Copiar la URL al portapapeles
      await navigator.clipboard.writeText(qrValue)

      toast({
        title: 'Enlace copiado',
        description: 'El enlace al perfil público ha sido copiado al portapapeles.',
      })
    } catch (error) {
      console.error('Error al copiar el enlace:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo copiar el enlace. Intenta con otra opción de compartir.',
      })
    }
  }

  const handleShareViaEmail = () => {
    const subject = encodeURIComponent(`Información de contacto para ${petData.name}`)
    const body = encodeURIComponent(
      `Hola,\n\nAquí está el enlace al perfil público de ${petData.name}:\n${qrValue}\n\nTambién puedes escanear el código QR adjunto.\n\nSaludos.`,
    )

    window.open(`mailto:?subject=${subject}&body=${body}`)

    toast({
      title: 'Correo preparado',
      description: 'Adjunta manualmente la imagen del QR que has copiado o descargado.',
    })
  }

  const handleShareViaWhatsApp = () => {
    const text = encodeURIComponent(`Información de contacto para ${petData.name}: ${qrValue}`)
    window.open(`https://wa.me/?text=${text}`)
  }

  const handleShareNative = async () => {
    if (!navigator.share) return

    try {
      await navigator.share({
        title: `Perfil público de ${petData.name}`,
        text: `Información de contacto para ${petData.name}`,
        url: qrValue,
      })

      toast({
        title: 'Compartido',
        description: 'El enlace ha sido compartido correctamente.',
      })
    } catch (error) {
      console.error('Error al compartir:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo compartir. Intenta con otra opción.',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <QrCode className='h-5 w-5' />
            Código QR de {petData.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue='qr'
          className='w-full'
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'qr' | 'share')}
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='qr'>Código QR</TabsTrigger>
            {/*<TabsTrigger value='share'>Compartir</TabsTrigger>*/}
          </TabsList>

          <TabsContent value='qr' className='flex flex-col items-center'>
            <div ref={qrRef} className='bg-white p-4 rounded-lg shadow-sm border border-green-100 my-4'>
              <QRCodeSVG
                value={qrValue}
                size={200}
                bgColor={'#FFFFFF'}
                fgColor={'#000000'}
                level={'H'}
                includeMargin={true}
                imageSettings={{
                  src: '/placeholder.svg?height=40&width=40',
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>
            <p className='text-sm text-center text-muted-foreground mb-4'>
              Este código QR contiene un enlace al perfil público de {petData.name}. Cualquier persona puede escanearlo
              para ver la información de contacto sin necesidad de iniciar sesión.
            </p>
            <Button onClick={handleDownload} className='w-full bg-green-600 hover:bg-green-700'>
              <Download className='mr-2 h-4 w-4' /> Descargar QR
            </Button>
          </TabsContent>

          {/*<TabsContent value='share' className='space-y-4'>
            <p className='text-sm text-muted-foreground'>Comparte el perfil público de {petData.name} a través de:</p>

            <div className='grid gap-3'>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <Button variant='outline' className='w-full justify-start' onClick={handleShareNative}>
                  <Share2 className='h-5 w-5 mr-2 text-green-600' />
                  Compartir
                </Button>
              )}

              <Button variant='outline' className='w-full justify-start' onClick={handleShareViaWhatsApp}>
                <svg
                  viewBox='0 0 24 24'
                  className='h-5 w-5 mr-2 fill-current text-green-600'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                </svg>
                WhatsApp
              </Button>

              <Button variant='outline' className='w-full justify-start' onClick={handleShareViaEmail}>
                <Mail className='h-5 w-5 mr-2 text-blue-600' />
                Correo electrónico
              </Button>

              <Button variant='outline' className='w-full justify-start' onClick={handleCopyToClipboard}>
                <Copy className='h-5 w-5 mr-2 text-gray-600' />
                Copiar enlace
              </Button>

              <Button variant='outline' className='w-full justify-start' onClick={handleDownload}>
                <Download className='h-5 w-5 mr-2 text-purple-600' />
                Descargar QR
              </Button>
            </div>

            <div className='pt-4'>
              <Button onClick={() => setActiveTab('qr')} variant='ghost' className='w-full'>
                <QrCode className='mr-2 h-4 w-4' /> Ver código QR
              </Button>
            </div>
          </TabsContent>*/}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

