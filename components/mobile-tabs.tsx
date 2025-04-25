'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '../libs/utils'

interface MobileTabsProps {
  tabs: {
    value: string
    label: string
    icon: React.ReactNode
  }[]
  activeTab: string
  onChange: (value: string) => void
}

export function MobileTabs({ tabs, activeTab, onChange }: MobileTabsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Detectar si necesitamos mostrar los controles de scroll
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollAreaRef.current) {
        const { scrollWidth, clientWidth } = scrollAreaRef.current
        setShowControls(scrollWidth > clientWidth)
        setMaxScroll(scrollWidth - clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [tabs])

  // Scroll al tab activo cuando cambia
  useEffect(() => {
    if (scrollAreaRef.current) {
      const activeTabElement = scrollAreaRef.current.querySelector(`[data-tab-value='${activeTab}']`)
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement as HTMLElement
        const scrollAreaWidth = scrollAreaRef.current.clientWidth
        const scrollTo = offsetLeft - scrollAreaWidth / 2 + offsetWidth / 2

        scrollAreaRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        })
      }
    }
  }, [activeTab])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setScrollPosition(target.scrollLeft)
  }

  const scrollLeft = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({ left: -150, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({ left: 150, behavior: 'smooth' })
    }
  }

  return (
    <div className='relative w-full mb-4'>
      <div className='relative flex items-center'>
        {showControls && scrollPosition > 10 && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute left-0 z-10 h-7 w-7 rounded-full bg-white shadow-sm flex-shrink-0 border'
            onClick={scrollLeft}
            aria-label='Desplazar a la izquierda'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
        )}

        <div className='w-full overflow-x-auto scrollbar-hide px-2 py-1' ref={scrollAreaRef} onScroll={handleScroll}>
          <div className='flex space-x-2 min-w-max'>
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                data-tab-value={tab.value}
                variant='ghost'
                size='sm'
                onClick={() => onChange(tab.value)}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs',
                  activeTab === tab.value
                    ? 'border-green-200 bg-green-100/50 text-green-900 font-medium'
                    : 'border-transparent hover:bg-green-50 text-gray-700',
                )}
              >
                <span className='flex-shrink-0'>{tab.icon}</span>
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {showControls && scrollPosition < maxScroll - 10 && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-0 z-10 h-7 w-7 rounded-full bg-white shadow-sm flex-shrink-0 border'
            onClick={scrollRight}
            aria-label='Desplazar a la derecha'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
