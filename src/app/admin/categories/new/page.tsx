import CategoryForm from '@/components/admin/CategoryForm'
import Link from 'next/link'

export const metadata = { title: 'Nouvelle catégorie | Admin HotDeal' }

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Retour aux catégories
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Nouvelle catégorie</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <CategoryForm />
      </div>
    </div>
  )
}
