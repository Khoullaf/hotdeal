interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile' | 'footer'
  className?: string
}

export default function AdBanner({ size = 'rectangle', className = '' }: AdBannerProps) {
  const dimensions: Record<string, { width: number; height: number; label: string }> = {
    leaderboard: { width: 728, height: 90, label: 'Bannière 728×90' },
    rectangle: { width: 300, height: 250, label: 'Rectangle 300×250' },
    sidebar: { width: 300, height: 600, label: 'Sidebar 300×600' },
    mobile: { width: 320, height: 50, label: 'Mobile 320×50' },
    footer: { width: 728, height: 90, label: 'Pied de page 728×90' },
  }
  const { width, height, label } = dimensions[size]
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${className}`}
      style={{ maxWidth: width, height }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
    >
      <div className="text-center text-gray-400 dark:text-gray-500 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider">Espace Publicitaire</p>
        <p className="text-xs mt-1">{label}</p>
      </div>
    </div>
  )
}
