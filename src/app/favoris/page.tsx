'use client'
import { useState, useEffect } from 'react'
import OfferGrid from '@/components/OfferGrid'
import { Heart } from 'lucide-react'

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

export default function FavorisPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('hotdeal_favorites') || '[]')
    if (favoriteIds.length === 0) {
      setLoading(false)
      return
    }
    fetch(`/api/favorites?offerIds=${favoriteIds.join(',')}`)
      .then(r => r.json())
      .then(data => {
        setOffers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-500">Chargement de vos favoris...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-500 fill-red-500" size={28} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes favoris</h1>
        <span className="text-gray-500">({offers.length})</span>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">💔</p>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucun favori pour l&apos;instant</h2>
          <p className="text-gray-500 dark:text-gray-400">Cliquez sur le cœur sur une offre pour l&apos;ajouter à vos favoris.</p>
        </div>
      ) : (
        <OfferGrid offers={offers} />
      )}
    </div>
  )
}
