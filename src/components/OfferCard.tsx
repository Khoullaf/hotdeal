'use client'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import Badge from './Badge'
import ExpiryTimer from './ExpiryTimer'
import AffiliateButton from './AffiliateButton'
import { formatPrice, generateSessionId } from '@/lib/utils'

interface Offer {
  id: string
  title: string
  description: string
  originalPrice: number | null
  discountPrice: number
  discount: number | null
  imageUrl: string | null
  affiliateUrl: string
  expiresAt: string | null
  isFeatured: boolean
  merchant: { name: string; slug: string }
  category: { name: string; slug: string; icon: string | null; color: string | null }
}

interface OfferCardProps {
  offer: Offer
}

export default function OfferCard({ offer }: OfferCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('hotdeal_favorites') || '[]')
    setIsFavorite(favorites.includes(offer.id))
  }, [offer.id])

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const sessionId = generateSessionId()
    const favorites = JSON.parse(localStorage.getItem('hotdeal_favorites') || '[]')
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== offer.id)
      : [...favorites, offer.id]
    localStorage.setItem('hotdeal_favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offerId: offer.id, sessionId }),
    }).catch(() => {})
  }

  const isExpiringSoon = offer.expiresAt
    ? new Date(offer.expiresAt).getTime() - Date.now() < 2 * 24 * 60 * 60 * 1000
    : false

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
        {offer.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">{offer.category.icon || '🛍️'}</span>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {offer.discount && <Badge variant="discount">{offer.discount}% OFF</Badge>}
          {offer.isFeatured && <Badge variant="featured">⭐ Coup de cœur</Badge>}
          {isExpiringSoon && <Badge variant="expiring">🔥 Expire bientôt</Badge>}
        </div>
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{offer.merchant.name}</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-xs font-medium" style={{ color: offer.category.color || '#6b7280' }}>
            {offer.category.icon} {offer.category.name}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">{offer.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">{offer.description}</p>

        {offer.expiresAt && (
          <div className="mb-2">
            <ExpiryTimer expiresAt={offer.expiresAt} />
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div>
            {offer.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">{formatPrice(offer.originalPrice)}</span>
            )}
            <span className="text-lg font-bold text-orange-500">{formatPrice(offer.discountPrice)}</span>
          </div>
          <AffiliateButton offerId={offer.id} affiliateUrl={offer.affiliateUrl} size="sm" />
        </div>
      </div>
    </div>
  )
}
