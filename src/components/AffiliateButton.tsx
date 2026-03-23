'use client'
import { ExternalLink } from 'lucide-react'
import { generateSessionId } from '@/lib/utils'

interface AffiliateButtonProps {
  offerId: string
  affiliateUrl: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AffiliateButton({ offerId, affiliateUrl, size = 'md', className = '' }: AffiliateButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const handleClick = async () => {
    const sessionId = generateSessionId()
    await fetch(`/api/offers/${offerId}/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {})
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors ${sizeClasses[size]} ${className}`}
    >
      <ExternalLink size={size === 'lg' ? 20 : 16} />
      Voir l&apos;offre
    </button>
  )
}
