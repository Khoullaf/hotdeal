'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
}

interface Merchant {
  id: string
  name: string
}

interface OfferFormProps {
  categories: Category[]
  merchants: Merchant[]
  initialData?: {
    id: string
    title: string
    description: string
    originalPrice: number | null
    discountPrice: number
    discount: number | null
    imageUrl: string | null
    affiliateUrl: string
    sourceUrl: string | null
    categoryId: string
    merchantId: string
    expiresAt: Date | null
    isActive: boolean
    isFeatured: boolean
  }
}

function toDatetimeLocal(date: Date | null): string {
  if (!date) return ''
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export default function OfferForm({ categories, merchants, initialData }: OfferFormProps) {
  const router = useRouter()
  const isEdit = !!initialData

  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [originalPrice, setOriginalPrice] = useState(initialData?.originalPrice?.toString() || '')
  const [discountPrice, setDiscountPrice] = useState(initialData?.discountPrice?.toString() || '')
  const [discount, setDiscount] = useState(initialData?.discount?.toString() || '')
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')
  const [affiliateUrl, setAffiliateUrl] = useState(initialData?.affiliateUrl || '')
  const [sourceUrl, setSourceUrl] = useState(initialData?.sourceUrl || '')
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '')
  const [merchantId, setMerchantId] = useState(initialData?.merchantId || '')
  const [expiresAt, setExpiresAt] = useState(toDatetimeLocal(initialData?.expiresAt ?? null))
  const [isActive, setIsActive] = useState(initialData?.isActive !== false)
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured === true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const url = isEdit
        ? `/api/admin/offers/${initialData!.id}`
        : '/api/admin/offers'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description,
          originalPrice: originalPrice ? Number(originalPrice) : null,
          discountPrice: Number(discountPrice),
          discount: discount ? Number(discount) : null,
          imageUrl: imageUrl || null,
          affiliateUrl,
          sourceUrl: sourceUrl || null,
          categoryId,
          merchantId,
          expiresAt: expiresAt || null,
          isActive,
          isFeatured,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur')
      } else {
        router.push('/admin/offres')
        router.refresh()
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className={labelClass}>Titre <span className="text-red-500">*</span></label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="ex : iPhone 15 Pro 256GB" required />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass + ' min-h-[100px] resize-y'}
          placeholder="Description de l'offre..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Prix original (€)</label>
          <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className={inputClass} placeholder="0.00" min="0" step="0.01" />
        </div>
        <div>
          <label className={labelClass}>Prix remisé (€) <span className="text-red-500">*</span></label>
          <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className={inputClass} placeholder="0.00" min="0" step="0.01" required />
        </div>
        <div>
          <label className={labelClass}>Réduction (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className={inputClass} placeholder="0" min="0" max="100" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Catégorie <span className="text-red-500">*</span></label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputClass} required>
            <option value="">— Choisir une catégorie —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Marchand <span className="text-red-500">*</span></label>
          <select value={merchantId} onChange={(e) => setMerchantId(e.target.value)} className={inputClass} required>
            <option value="">— Choisir un marchand —</option>
            {merchants.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>URL d&apos;affiliation (lien de l&apos;offre) <span className="text-red-500">*</span></label>
        <input type="url" value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} className={inputClass} placeholder="https://..." required />
      </div>

      <div>
        <label className={labelClass}>URL source (page originale)</label>
        <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className={inputClass} placeholder="https://..." />
      </div>

      <div>
        <label className={labelClass}>Image (URL)</label>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
      </div>

      <div>
        <label className={labelClass}>Date d&apos;expiration</label>
        <input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputClass} />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Offre active</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mise en avant</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Créer l'offre"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
