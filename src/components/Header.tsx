'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Moon, Sun, Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [favCount, setFavCount] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('hotdeal_favorites') || '[]')
    setFavCount(favorites.length)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('hotdeal_theme', isDark ? 'light' : 'dark')
  }

  const handleSearch = (query: string) => {
    if (query) router.push(`/offres?search=${encodeURIComponent(query)}`)
    else router.push('/offres')
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">HotDeal</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBar onSearch={handleSearch} className="w-full" />
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link href="/offres" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              Offres
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              Catégories
            </Link>
            <Link href="/marchands" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              Marchands
            </Link>
            <Link href="/favoris" className="relative text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>
            <button onClick={toggleDark} className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600 dark:text-gray-300">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <SearchBar onSearch={handleSearch} className="w-full" />
            <nav className="flex flex-col gap-2">
              <Link href="/offres" className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1" onClick={() => setMobileMenuOpen(false)}>Offres</Link>
              <Link href="/categories" className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1" onClick={() => setMobileMenuOpen(false)}>Catégories</Link>
              <Link href="/marchands" className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1" onClick={() => setMobileMenuOpen(false)}>Marchands</Link>
              <Link href="/favoris" className="text-sm font-medium text-gray-700 dark:text-gray-300 py-1" onClick={() => setMobileMenuOpen(false)}>Favoris ({favCount})</Link>
              <button onClick={toggleDark} className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 py-1">
                {isDark ? '☀️ Mode clair' : '🌙 Mode sombre'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
