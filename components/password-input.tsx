'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, PawPrintIcon as Paw } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '../libs/utils'
import { Button } from './ui/button'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showCounter?: boolean
  showStrength?: boolean
}

export function PasswordInput({ className, showCounter = true, showStrength = true, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const [pawPosition, setPawPosition] = useState(0)

  // Calculate password strength
  useEffect(() => {
    let score = 0
    if (password.length > 0) score += 10
    if (password.length > 7) score += 15
    if (/[A-Z]/.test(password)) score += 20
    if (/[0-9]/.test(password)) score += 20
    if (/[^A-Za-z0-9]/.test(password)) score += 25
    if (password.length > 12) score += 10

    // Ensure max score is 100
    score = Math.min(score, 100)
    setStrength(score)

    // Calculate paw position based on password length and strength
    const maxPosition = 100 - 20 // 20 is the width of the paw in percentage
    const position = password.length ? Math.min(password.length * 5 + strength / 5, maxPosition) : 0
    setPawPosition(position)
  }, [password])

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500'
    if (strength < 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Get strength text
  const getStrengthText = () => {
    if (strength < 30) return 'Débil'
    if (strength < 60) return 'Media'
    return 'Fuerte'
  }

  return (
    <div className='space-y-2'>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className='h-4 w-4 text-muted-foreground' />
          ) : (
            <Eye className='h-4 w-4 text-muted-foreground' />
          )}
          <span className='sr-only'>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</span>
        </Button>
      </div>

      {showStrength && password.length > 0 && (
        <div className='space-y-1'>
          <div className='relative h-2 w-full overflow-hidden rounded-full bg-secondary'>
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-500 ${getStrengthColor()}`}
              style={{ width: `${strength}%` }}
            />
            {/*<div
              className='absolute top-1/2 -translate-y-1/2 transition-all duration-500 transform'
              style={{ left: `${pawPosition}%` }}
            >
              <Paw
                className={`h-5 w-5 transition-colors duration-500 ${
                  strength < 30 ? 'text-red-500' : strength < 60 ? 'text-yellow-500' : 'text-green-500'
                }`}
              />
            </div>*/}
          </div>
          <div className='flex justify-between text-xs'>
            <span className='text-muted-foreground'>{showCounter && `${password.length} caracteres`}</span>
            <span
              className={cn(
                'font-medium',
                strength < 30 ? 'text-red-500' : strength < 60 ? 'text-yellow-500' : 'text-green-500',
              )}
            >
              {getStrengthText()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

