'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: '📊 Tableau de bord', exact: true },
  { href: '/admin/categories', label: '📂 Catégories', exact: false },
  { href: '/admin/marchands', label: '🏪 Marchands', exact: false },
  { href: '/admin/offres', label: '🏷️ Offres', exact: false },
]

function AdminNav() {
  const pathname = usePathname()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-3">Admin</span>
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            Déconnexion →
          </button>
        </div>
      </div>
    </nav>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConditionalNav />
      <div>{children}</div>
    </>
  )
}

function ConditionalNav() {
  const pathname = usePathname()
  if (pathname === '/admin/login') return null
  return <AdminNav />
}
