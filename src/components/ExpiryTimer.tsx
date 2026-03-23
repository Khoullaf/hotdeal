'use client'
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { timeUntil } from '@/lib/utils'

interface ExpiryTimerProps {
  expiresAt: string | Date
}

const UPDATE_INTERVAL_MS = 60_000
const EXPIRING_SOON_THRESHOLD_MS = 2 * 24 * 60 * 60 * 1000

export default function ExpiryTimer({ expiresAt }: ExpiryTimerProps) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const date = new Date(expiresAt)
    setTimeLeft(timeUntil(date))
    const interval = setInterval(() => {
      setTimeLeft(timeUntil(date))
    }, UPDATE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [expiresAt])

  if (!timeLeft || timeLeft === 'Expiré') return null

  const date = new Date(expiresAt)
  const diff = date.getTime() - new Date().getTime()
  const isUrgent = diff < EXPIRING_SOON_THRESHOLD_MS

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${isUrgent ? 'text-red-500' : 'text-orange-500'}`}>
      <Clock size={12} />
      Expire dans {timeLeft}
    </span>
  )
}
