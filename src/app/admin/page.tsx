import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export const metadata = {
  title: 'Administration | HotDeal',
}

export default async function AdminPage() {
  const [totalOffers, activeOffers, totalClicks, totalFavorites, recentOffers] = await Promise.all([
    prisma.offer.count(),
    prisma.offer.count({ where: { isActive: true } }),
    prisma.offer.aggregate({ _sum: { clicks: true } }),
    prisma.favorite.count(),
    prisma.offer.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { merchant: true, category: true },
    }),
  ])

  const stats = [
    { label: 'Total offres', value: totalOffers, icon: '📦', color: 'bg-blue-500' },
    { label: 'Offres actives', value: activeOffers, icon: '✅', color: 'bg-green-500' },
    { label: 'Total clics', value: totalClicks._sum.clicks || 0, icon: '👆', color: 'bg-orange-500' },
    { label: 'Favoris', value: totalFavorites, icon: '❤️', color: 'bg-red-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚙️ Administration</h1>
        <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">← Retour au site</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value.toLocaleString('fr-FR')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Offres récentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Titre</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Marchand</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Catégorie</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Prix</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Clics</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs truncate">{offer.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{offer.merchant.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{offer.category.name}</td>
                  <td className="px-6 py-4 text-orange-500 font-semibold">{formatPrice(offer.discountPrice)}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{offer.clicks}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${offer.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {offer.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
