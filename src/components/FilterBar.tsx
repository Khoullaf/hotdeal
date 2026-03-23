'use client'

interface FilterBarProps {
  categories: { id: string; name: string; slug: string; icon: string | null }[]
  selectedCategory: string
  onCategoryChange: (slug: string) => void
  selectedDiscount: number
  onDiscountChange: (discount: number) => void
  maxPrice: number
  onMaxPriceChange: (price: number) => void
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDiscount,
  onDiscountChange,
  maxPrice,
  onMaxPriceChange,
}: FilterBarProps) {
  const discountOptions = [0, 20, 30, 50, 70]

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Catégories</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onCategoryChange('')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === '' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Toutes les catégories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {cat.icon} {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Réduction minimale</h3>
        <div className="space-y-2">
          {discountOptions.map((d) => (
            <label key={d} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="discount"
                value={d}
                checked={selectedDiscount === d}
                onChange={() => onDiscountChange(d)}
                className="accent-orange-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {d === 0 ? 'Toutes les réductions' : `${d}% et plus`}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Prix maximum: <span className="text-orange-500">{maxPrice === 2000 ? 'Illimité' : `${maxPrice}€`}</span>
        </h3>
        <input
          type="range"
          min={0}
          max={2000}
          step={50}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0€</span>
          <span>2000€</span>
        </div>
      </div>
    </aside>
  )
}
