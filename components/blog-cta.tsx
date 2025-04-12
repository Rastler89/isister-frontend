import { PawPrint } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

interface BlogCTAProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  variant?: 'default' | 'compact'
}

export function BlogCTA({ title, description, buttonText, buttonLink, variant = 'default' }: BlogCTAProps) {
  return (
    <Card className='border-green-100 bg-gradient-to-r from-green-50 to-green-100/50 mt-12 overflow-hidden'>
      <CardContent className={`p-8 ${variant === 'compact' ? 'py-6' : 'py-10'}`}>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-start gap-4'>
            <div className='bg-green-100 p-3 rounded-full hidden sm:flex'>
              <PawPrint className='h-6 w-6 text-green-600' />
            </div>
            <div>
              <h3 className={`font-bold ${variant === 'compact' ? 'text-xl' : 'text-2xl'} mb-2`}>{title}</h3>
              <p className='text-muted-foreground'>{description}</p>
            </div>
          </div>
          <Button
            asChild
            className='bg-green-600 hover:bg-green-700 whitespace-nowrap'
          >
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}