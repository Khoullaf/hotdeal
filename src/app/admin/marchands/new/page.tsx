import MerchantForm from '@/components/admin/MerchantForm'
import Link from 'next/link'

export const metadata = { title: 'Nouveau marchand | Admin HotDeal' }

export default function NewMerchantPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/admin/marchands" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Retour aux marchands
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Nouveau marchand</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <MerchantForm />
      </div>
    </div>
  )
}
