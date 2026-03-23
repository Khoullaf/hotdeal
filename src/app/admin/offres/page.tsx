import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Offres | Admin HotDeal' }

export default async function OffresPage() {
  const offers = await prisma.offer.findMany({
    include: { merchant: true, category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🏷️ Offres</h1>
        <Link
          href="/admin/offres/new"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          + Nouvelle offre
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Titre</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Catégorie</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Marchand</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Prix remisé</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Remise</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Statut</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Vedette</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Clics</th>
                <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {offers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-400">Aucune offre</td>
                </tr>
              )}
              {offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-xs">
                    <span className="block truncate">{offer.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{offer.category.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{offer.merchant.name}</td>
                  <td className="px-6 py-4 text-orange-500 font-semibold whitespace-nowrap">{formatPrice(offer.discountPrice)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {offer.discount ? (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                        -{offer.discount}%
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${offer.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {offer.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{offer.isFeatured ? '⭐' : '—'}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{offer.clicks}</td>
                  <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                    <Link
                      href={`/admin/offres/${offer.id}/edit`}
                      className="text-orange-500 hover:text-orange-600 text-xs font-medium"
                    >
                      Modifier
                    </Link>
                    <DeleteButton
                      id={offer.id}
                      endpoint="/api/admin/offers"
                      confirmMessage={`Supprimer l'offre "${offer.title}" ?`}
                      redirectTo="/admin/offres"
                    />
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
