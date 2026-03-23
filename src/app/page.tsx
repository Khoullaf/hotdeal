import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import OfferGrid from '@/components/OfferGrid'
import AdBanner from '@/components/AdBanner'

export default async function HomePage() {
  const [featuredOffers, recentOffers, categories] = await Promise.all([
    prisma.offer.findMany({
      where: { isFeatured: true, isActive: true },
      include: { merchant: true, category: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.offer.findMany({
      where: { isActive: true },
      include: { merchant: true, category: true },
      orderBy: { createdAt: 'desc' },
      take: 9,
    }),
    prisma.category.findMany({
      include: { _count: { select: { offers: true } } },
    }),
  ])

  const serializedFeatured = featuredOffers.map(o => ({
    ...o,
    originalPrice: o.originalPrice,
    expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    merchant: { name: o.merchant.name, slug: o.merchant.slug },
    category: { name: o.category.name, slug: o.category.slug, icon: o.category.icon, color: o.category.color },
  }))

  const serializedRecent = recentOffers.map(o => ({
    ...o,
    originalPrice: o.originalPrice,
    expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    merchant: { name: o.merchant.name, slug: o.merchant.slug },
    category: { name: o.category.name, slug: o.category.slug, icon: o.category.icon, color: o.category.color },
  }))

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            🔥 Trouvez les meilleurs<br />bons plans !
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Économisez jusqu&apos;à <span className="font-bold">70%</span> sur des milliers de produits
          </p>
          <Link
            href="/offres"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-orange-50 transition-colors shadow-lg"
          >
            Voir toutes les offres →
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ad Banner */}
        <div className="flex justify-center mb-12">
          <AdBanner size="leaderboard" />
        </div>

        {/* Featured Offers */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Coups de cœur</h2>
            <Link href="/offres?featured=true" className="text-orange-500 hover:text-orange-600 font-medium text-sm">
              Voir tout →
            </Link>
          </div>
          <OfferGrid offers={serializedFeatured} />
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🗂️ Catégories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <span className="text-4xl mb-2">{cat.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{cat.name}</span>
                <span className="text-xs text-gray-500 mt-1">{cat._count.offers} offres</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad Banner */}
        <div className="flex justify-center mb-12">
          <AdBanner size="leaderboard" />
        </div>

        {/* Recent Offers */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🆕 Offres récentes</h2>
            <Link href="/offres" className="text-orange-500 hover:text-orange-600 font-medium text-sm">
              Voir tout →
            </Link>
          </div>
          <OfferGrid offers={serializedRecent} />
        </section>
      </div>
    </div>
  )
}
