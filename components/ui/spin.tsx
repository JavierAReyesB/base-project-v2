import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

export function Spin({ className, size = 'md' }: SpinProps) {
  return (
    <Loader2
      className={cn(
        'animate-spin text-muted-foreground',
        sizeMap[size],
        className
      )}
    />
  )
}
