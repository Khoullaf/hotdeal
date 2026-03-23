import Link from 'next/link'
import AdBanner from './AdBanner'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <AdBanner size="footer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-xl text-white">HotDeal</span>
            </div>
            <p className="text-sm text-gray-400">Les meilleurs bons plans et promotions du web, mis à jour quotidiennement.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/offres" className="hover:text-orange-400 transition-colors">Toutes les offres</Link></li>
              <li><Link href="/categories" className="hover:text-orange-400 transition-colors">Catégories</Link></li>
              <li><Link href="/marchands" className="hover:text-orange-400 transition-colors">Marchands</Link></li>
              <li><Link href="/favoris" className="hover:text-orange-400 transition-colors">Mes favoris</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/high-tech" className="hover:text-orange-400 transition-colors">💻 High-Tech</Link></li>
              <li><Link href="/categories/mode" className="hover:text-orange-400 transition-colors">👗 Mode</Link></li>
              <li><Link href="/categories/maison" className="hover:text-orange-400 transition-colors">🏠 Maison</Link></li>
              <li><Link href="/categories/voyages" className="hover:text-orange-400 transition-colors">✈️ Voyages</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Administration</Link></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Nous contacter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HotDeal. Tous droits réservés. Les liens sont des liens d&apos;affiliation.</p>
        </div>
      </div>
    </footer>
  )
}
