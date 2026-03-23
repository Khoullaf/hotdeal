import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Marchands | HotDeal',
}

export default async function MarchandsPage() {
  const merchants = await prisma.merchant.findMany({
    include: { _count: { select: { offers: { where: { isActive: true } } } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🏪 Nos marchands partenaires</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {merchants.map((merchant) => (
          <Link
            key={merchant.id}
            href={`/marchands/${merchant.slug}`}
            className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-2xl font-bold text-orange-600">
              {merchant.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">{merchant.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{merchant._count.offers} offres actives</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
