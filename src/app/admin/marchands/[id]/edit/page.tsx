import { prisma } from '@/lib/prisma'
import MerchantForm from '@/components/admin/MerchantForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Modifier marchand | Admin HotDeal' }

export default async function EditMerchantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const merchant = await prisma.merchant.findUnique({ where: { id } })
  if (!merchant) notFound()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin/marchands" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Retour aux marchands
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Modifier : {merchant.name}</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <MerchantForm initialData={merchant} />
      </div>
    </div>
  )
}
