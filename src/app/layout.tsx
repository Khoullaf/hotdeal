import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from './providers'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotdeal.fr'
const adSenseClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID

export const metadata: Metadata = {
  title: 'HotDeal - Meilleurs bons plans et promotions',
  description: "Découvrez les meilleures promotions et bons plans du web. High-Tech, Mode, Maison, Alimentation, Voyages - économisez jusqu'à 70%.",
  keywords: 'bons plans, promotions, réductions, deals, codes promo',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'HotDeal - Meilleurs bons plans et promotions',
    description: "Découvrez les meilleures promotions et bons plans du web.",
    url: siteUrl,
    siteName: 'HotDeal',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans">
        {adSenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
