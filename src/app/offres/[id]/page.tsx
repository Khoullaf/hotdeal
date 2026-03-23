import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import AffiliateButton from '@/components/AffiliateButton'
import ExpiryTimer from '@/components/ExpiryTimer'
import Badge from '@/components/Badge'
import OfferGrid from '@/components/OfferGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { merchant: true }
  })
  if (!offer) return { title: 'Offre non trouvée' }
  return {
    title: `${offer.title} - ${offer.merchant.name} | HotDeal`,
    description: offer.description,
  }
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { id } = await params
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { merchant: true, category: true },
  })

  if (!offer) notFound()

  // Increment view counter (fire-and-forget, do not block render)
  prisma.offer.update({ where: { id }, data: { views: { increment: 1 } } }).catch((e) => {
    console.error('[views] Failed to increment views for offer', id, e)
  })

  const relatedOffers = await prisma.offer.findMany({
    where: {
      categoryId: offer.categoryId,
      isActive: true,
      id: { not: offer.id },
    },
    include: { merchant: true, category: true },
    take: 3,
  })

  const serializedRelated = relatedOffers.map(o => ({
    ...o,
    expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    merchant: { name: o.merchant.name, slug: o.merchant.slug },
    category: { name: o.category.name, slug: o.category.slug, icon: o.category.icon, color: o.category.color },
  }))

  const savings = offer.originalPrice ? offer.originalPrice - offer.discountPrice : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
          <span className="text-8xl">{offer.category.icon || '🛍️'}</span>
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {offer.discount && <Badge variant="discount">{offer.discount}% OFF</Badge>}
            {offer.isFeatured && <Badge variant="featured">⭐ Coup de cœur</Badge>}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{offer.merchant.name}</span>
            <span>•</span>
            <span style={{ color: offer.category.color || undefined }}>{offer.category.icon} {offer.category.name}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{offer.title}</h1>

          <div className="flex items-end gap-4 mb-4">
            <span className="text-4xl font-extrabold text-orange-500">{formatPrice(offer.discountPrice)}</span>
            {offer.originalPrice && (
              <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(offer.originalPrice)}</span>
            )}
            {savings > 0 && (
              <span className="text-green-600 dark:text-green-400 font-semibold mb-1">Économie: {formatPrice(savings)}</span>
            )}
          </div>

          {offer.expiresAt && (
            <div className="mb-4">
              <ExpiryTimer expiresAt={offer.expiresAt.toISOString()} />
            </div>
          )}

          <AffiliateButton offerId={offer.id} affiliateUrl={offer.affiliateUrl} size="lg" className="mb-6 w-full sm:w-auto justify-center" />

          <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{offer.description}</p>
          </div>
        </div>
      </div>

      {serializedRelated.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Offres similaires</h2>
          <OfferGrid offers={serializedRelated} />
        </div>
      )}
    </div>
  )
}
