import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from './providers'

export const metadata: Metadata = {
  title: 'HotDeal - Meilleurs bons plans et promotions',
  description: "Découvrez les meilleures promotions et bons plans du web. High-Tech, Mode, Maison, Alimentation, Voyages - économisez jusqu'à 70%.",
  keywords: 'bons plans, promotions, réductions, deals, codes promo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
