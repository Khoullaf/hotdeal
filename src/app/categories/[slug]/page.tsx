import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OfferGrid from '@/components/OfferGrid'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } })
  if (!category) return { title: 'Catégorie non trouvée' }
  return { title: `${category.name} | HotDeal`, description: `Meilleures offres ${category.name}` }
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } })
  if (!category) notFound()

  const offers = await prisma.offer.findMany({
    where: { categoryId: category.id, isActive: true },
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
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{serialized.length} offres disponibles</p>
        </div>
      </div>
      <OfferGrid offers={serialized} />
    </div>
  )
}
