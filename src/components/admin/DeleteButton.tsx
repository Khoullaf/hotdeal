'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  endpoint: string
  confirmMessage: string
  redirectTo: string
}

export default function DeleteButton({ id, endpoint, confirmMessage, redirectTo }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(confirmMessage)) return
    setLoading(true)
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Erreur lors de la suppression')
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } catch {
      alert('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-600 disabled:opacity-50 text-xs font-medium"
    >
      {loading ? 'Suppression...' : 'Supprimer'}
    </button>
  )
}
