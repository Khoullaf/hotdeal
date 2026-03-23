import React from 'react'
import OfferCard from './OfferCard'
import AdBanner from './AdBanner'

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

interface OfferGridProps {
  offers: Offer[]
}

export default function OfferGrid({ offers }: OfferGridProps) {
  const items: React.ReactNode[] = []

  offers.forEach((offer, index) => {
    items.push(<OfferCard key={offer.id} offer={offer} />)
    if ((index + 1) % 6 === 0 && index + 1 < offers.length) {
      items.push(
        <div key={`ad-${index}`} className="col-span-full flex justify-center my-4">
          <AdBanner size="leaderboard" />
        </div>
      )
    }
  })

  if (offers.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🔍</p>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucune offre trouvée</h3>
        <p className="text-gray-500 dark:text-gray-400">Essayez de modifier vos filtres de recherche.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items}
    </div>
  )
}
