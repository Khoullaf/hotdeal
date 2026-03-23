'use client'
import { useState, useEffect, useCallback } from 'react'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import OfferGrid from '@/components/OfferGrid'
import Sidebar from '@/components/Sidebar'
import { SlidersHorizontal } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  color: string | null
}

interface Offer {
  id: string
  title: string
  description: string
  originalPrice: number | null
  discountPrice: number
  discount: number | null
  imageUrl: string | null
  affiliateUrl: string
  expiresAt: string | null
  isFeatured: boolean
  merchant: { name: string; slug: string }
  category: { name: string; slug: string; icon: string | null; color: string | null }
}

export default function OffresPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDiscount, setSelectedDiscount] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [sort, setSort] = useState('newest')
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories)
  }, [])

  const fetchOffers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedDiscount > 0) params.set('minDiscount', String(selectedDiscount))
    if (maxPrice < 2000) params.set('maxPrice', String(maxPrice))
    params.set('sort', sort)
    params.set('page', String(page))

    const res = await fetch(`/api/offers?${params}`)
    const data = await res.json()
    setOffers(data.offers)
    setTotal(data.total)
    setTotalPages(data.totalPages)
    setLoading(false)
  }, [search, selectedCategory, selectedDiscount, maxPrice, sort, page])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  const handleSearch = (q: string) => {
    setSearch(q)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Toutes les offres <span className="text-gray-500 font-normal text-lg">({total})</span>
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg text-sm"
        >
          <SlidersHorizontal size={16} />
          Filtres
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <SearchBar onSearch={handleSearch} className="flex-1" />
        <select
          value={sort}
          onChange={e => { setSort(e.target.value); setPage(1) }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="newest">Plus récents</option>
          <option value="popular">Plus populaires</option>
          <option value="discount">Meilleures réductions</option>
        </select>
      </div>

      <div className="flex gap-8">
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(slug) => { setSelectedCategory(slug); setPage(1) }}
              selectedDiscount={selectedDiscount}
              onDiscountChange={(d) => { setSelectedDiscount(d); setPage(1) }}
              maxPrice={maxPrice}
              onMaxPriceChange={(p) => { setMaxPrice(p); setPage(1) }}
            />
          </Sidebar>
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Filtres</h2>
              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={(slug) => { setSelectedCategory(slug); setPage(1); setShowFilters(false) }}
                selectedDiscount={selectedDiscount}
                onDiscountChange={(d) => { setSelectedDiscount(d); setPage(1) }}
                maxPrice={maxPrice}
                onMaxPriceChange={(p) => { setMaxPrice(p); setPage(1) }}
              />
            </div>
          </div>
        )}

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <OfferGrid offers={offers} />
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                ← Précédent
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, Math.min(page - 2, totalPages - Math.min(5, totalPages) + 1))
                const pageNum = startPage + i
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg border ${page === pageNum ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Suivant →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
