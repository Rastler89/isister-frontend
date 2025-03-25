'use client'

import { useEffect, useRef } from 'react'

interface WeightData {
  created_at: string
  value: string
  id: number
  pet_id: number
  type: number
}

interface WeightChartProps {
  data: WeightData[]
}

export const WeightChart = ({ data }: WeightChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const width = 800
  const height = 300
  const padding = 40
  const sortedData = data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

console.log('pes',data);
  useEffect(() => {
    if (!svgRef.current || data.length < 2) return

    // Calculate scales
    const weights = data.map(d => Number(d.value))
    const minWeight = Math.min(...weights)
    const maxWeight = Math.max(...weights)
    const yScale = (height - padding * 2) / (maxWeight - minWeight)
    const xScale = (width - padding * 2) / (data.length - 1)

    // Generate line points
    const points = data.map((d, i) => {
      const x = padding + i * xScale
      const y = height - padding - (Number(d.value) - minWeight) * yScale
      return `${x},${y}`
    }).join(' ')

    // Update path
    const path = svgRef.current.querySelector('.line') as SVGPathElement
    path.setAttribute('d', `M ${points}`)

    // Calculate trend line
    const xMean = (data.length - 1) / 2
    const yMean = weights.reduce((a, b) => a + b, 0) / weights.length
    const slope = data.reduce((acc, d, i) => {
      return acc + (i - xMean) * (Number(d.value) - yMean)
    }, 0) / data.reduce((acc, _, i) => acc + Math.pow(i - xMean, 2), 0)
    const intercept = yMean - slope * xMean

    const trendPoints = data.map((_, i) => {
      const x = padding + i * xScale
      const y = height - padding - (intercept + slope * i - minWeight) * yScale
      return `${x},${y}`
    }).join(' ')

    const trendPath = svgRef.current.querySelector('.trend') as SVGPathElement
    trendPath.setAttribute('d', `M ${trendPoints}`)
  }, [data])

  const formatDate = (isoString:string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = String(date.getFullYear()).slice(-2); 

    return `${day}/${month}/${year}`;
  };

  return (
    <svg ref={svgRef} width='100%' height='100%' viewBox={`0 0 ${width} ${height}`} className='overflow-visible'>
      <path className='line' fill='none' stroke='rgb(234 88 12)' strokeWidth='2' />
      <path className='trend' fill='none' stroke='rgb(234 88 12 / 0.5)' strokeWidth='2' strokeDasharray='5,5' />
      {data.map((d, i) => (
        <g key={i} transform={`translate(${padding + i * ((width - padding * 2) / (data.length - 1))},${height - padding - (Number(d.value) - Math.min(...data.map(d => Number(d.value)))) * ((height - padding * 2) / (Math.max(...data.map(d => Number(d.value))) - Math.min(...data.map(d => Number(d.value)))))})`}>
          <circle r='4' fill='rgb(234 88 12)' />
          <text y='-10' textAnchor='middle' className='text-xs'>{Number(d.value)}kg</text>
          <text y='20' textAnchor='middle' className='text-xs'>{formatDate(d.created_at)}</text>
        </g>
      ))}
    </svg>
  )
}

