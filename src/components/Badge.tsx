import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'discount' | 'new' | 'expiring' | 'featured' | 'default'
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    discount: 'bg-red-500 text-white',
    new: 'bg-blue-500 text-white',
    expiring: 'bg-orange-500 text-white',
    featured: 'bg-yellow-500 text-white',
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  }
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
