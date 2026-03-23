'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface MerchantFormProps {
  initialData?: {
    id: string
    name: string
    slug: string
    website: string | null
    affiliateUrl: string | null
    logo: string | null
  }
}

export default function MerchantForm({ initialData }: MerchantFormProps) {
  const router = useRouter()
  const isEdit = !!initialData

  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [website, setWebsite] = useState(initialData?.website || '')
  const [affiliateUrl, setAffiliateUrl] = useState(initialData?.affiliateUrl || '')
  const [logo, setLogo] = useState(initialData?.logo || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleNameChange(value: string) {
    setName(value)
    if (!isEdit) {
      setSlug(generateSlug(value))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const url = isEdit
        ? `/api/admin/merchants/${initialData!.id}`
        : '/api/admin/merchants'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, website, affiliateUrl, logo }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur')
      } else {
        router.push('/admin/marchands')
        router.refresh()
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="ex : Amazon"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
          placeholder="ex : amazon"
          pattern="[a-z0-9-]+"
          title="Lettres minuscules, chiffres et tirets uniquement"
          required
        />
        <p className="mt-1 text-xs text-gray-400">Lettres minuscules, chiffres et tirets uniquement</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Site web
        </label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="https://amazon.fr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL d&apos;affiliation
        </label>
        <input
          type="url"
          value={affiliateUrl}
          onChange={(e) => setAffiliateUrl(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="https://amzn.to/..."
        />
        <p className="mt-1 text-xs text-gray-400">Lien de base pour les liens d&apos;affiliation du marchand</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Logo (URL)
        </label>
        <input
          type="url"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le marchand'}
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
