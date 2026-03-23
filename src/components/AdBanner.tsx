'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile' | 'footer'
  className?: string
}

export default function AdBanner({ size = 'rectangle', className = '' }: AdBannerProps) {
  const dimensions: Record<string, { width: number; height: number; label: string }> = {
    leaderboard: { width: 728, height: 90, label: 'Bannière 728×90' },
    rectangle: { width: 300, height: 250, label: 'Rectangle 300×250' },
    sidebar: { width: 300, height: 600, label: 'Sidebar 300×600' },
    mobile: { width: 320, height: 50, label: 'Mobile 320×50' },
    footer: { width: 728, height: 90, label: 'Pied de page 728×90' },
  }
  const { width, height, label } = dimensions[size]

  const adClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID
  const adSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID

  useEffect(() => {
    if (adClientId) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        // AdSense initialization error (e.g. ad blocker or script not yet loaded)
      }
    }
  }, [adClientId])

  if (!adClientId) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${className}`}
        style={{ maxWidth: width, height }}
      >
        <div className="text-center text-gray-400 dark:text-gray-500 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider">Espace Publicitaire</p>
          <p className="text-xs mt-1">{label}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} style={{ maxWidth: width, minHeight: height }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height }}
        data-ad-client={adClientId}
        data-ad-slot={adSlotId || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
