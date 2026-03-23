import AdBanner from './AdBanner'

interface SidebarProps {
  children: React.ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="space-y-6">
      {children}
      <div className="flex justify-center">
        <AdBanner size="rectangle" />
      </div>
    </div>
  )
}
