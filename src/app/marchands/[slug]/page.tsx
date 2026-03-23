import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OfferGrid from '@/components/OfferGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const merchant = await prisma.merchant.findUnique({ where: { slug: params.slug } })
  if (!merchant) return { title: 'Marchand non trouvé' }
  return { title: `${merchant.name} | HotDeal` }
}

export default async function MerchantPage({ params }: PageProps) {
  const merchant = await prisma.merchant.findUnique({ where: { slug: params.slug } })
  if (!merchant) notFound()

  const offers = await prisma.offer.findMany({
    where: { merchantId: merchant.id, isActive: true },
    include: { merchant: true, category: true },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = offers.map(o => ({
    ...o,
    expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    merchant: { name: o.merchant.name, slug: o.merchant.slug },
    category: { name: o.category.name, slug: o.category.slug, icon: o.category.icon, color: o.category.color },
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-3xl font-bold text-orange-600">
          {merchant.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{merchant.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{serialized.length} offres disponibles</p>
        </div>
      </div>
      <OfferGrid offers={serialized} />
    </div>
  )
}
