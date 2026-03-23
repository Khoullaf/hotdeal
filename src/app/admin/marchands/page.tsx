import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Marchands | Admin HotDeal' }

export default async function MarchandsPage() {
  const merchants = await prisma.merchant.findMany({
    include: { _count: { select: { offers: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🏪 Marchands</h1>
        <Link
          href="/admin/marchands/new"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          + Nouveau marchand
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Nom</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Slug</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Site web</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Offres</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {merchants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Aucun marchand</td>
              </tr>
            )}
            {merchants.map((merchant) => (
              <tr key={merchant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{merchant.name}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{merchant.slug}</td>
                <td className="px-6 py-4">
                  {merchant.website ? (
                    <a
                      href={merchant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-600 truncate max-w-xs block"
                    >
                      {merchant.website}
                    </a>
                  ) : '—'}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{merchant._count.offers}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link
                    href={`/admin/marchands/${merchant.id}/edit`}
                    className="text-orange-500 hover:text-orange-600 text-xs font-medium"
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    id={merchant.id}
                    endpoint="/api/admin/merchants"
                    confirmMessage={`Supprimer le marchand "${merchant.name}" ?`}
                    redirectTo="/admin/marchands"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
