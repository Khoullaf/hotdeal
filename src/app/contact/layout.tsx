import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | HotDeal',
  description: 'Contactez l\'équipe HotDeal pour toute question, partenariat ou signalement.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
