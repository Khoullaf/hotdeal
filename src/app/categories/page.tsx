import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Catégories | HotDeal',
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { offers: { where: { isActive: true } } } } },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">🗂️ Toutes les catégories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
          >
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">{cat.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{cat._count.offers} offres actives</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
