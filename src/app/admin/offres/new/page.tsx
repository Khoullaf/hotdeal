import { prisma } from '@/lib/prisma'
import OfferForm from '@/components/admin/OfferForm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Nouvelle offre | Admin HotDeal' }

export default async function NewOfferPage() {
  const [categories, merchants] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.merchant.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin/offres" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Retour aux offres
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Nouvelle offre</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <OfferForm categories={categories} merchants={merchants} />
      </div>
    </div>
  )
}
