import { prisma } from '@/lib/prisma'
import OfferForm from '@/components/admin/OfferForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Modifier offre | Admin HotDeal' }

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [offer, categories, merchants] = await Promise.all([
    prisma.offer.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.merchant.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!offer) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin/offres" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Retour aux offres
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Modifier : {offer.title}</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <OfferForm categories={categories} merchants={merchants} initialData={offer} />
      </div>
    </div>
  )
}
