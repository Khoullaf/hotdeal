import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Catégories | Admin HotDeal' }

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { offers: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📂 Catégories</h1>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          + Nouvelle catégorie
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Icône</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Nom</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Slug</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Couleur</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Offres</th>
              <th className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {categories.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Aucune catégorie</td>
              </tr>
            )}
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-xl">{cat.icon || '—'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4">
                  {cat.color ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{cat.color}</span>
                    </span>
                  ) : '—'}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{cat._count.offers}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="text-orange-500 hover:text-orange-600 text-xs font-medium"
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    id={cat.id}
                    endpoint="/api/admin/categories"
                    confirmMessage={`Supprimer la catégorie "${cat.name}" ?`}
                    redirectTo="/admin/categories"
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
