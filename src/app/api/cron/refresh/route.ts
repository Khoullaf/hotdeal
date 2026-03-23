import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const now = new Date()

  const result = await prisma.offer.updateMany({
    where: {
      isActive: true,
      expiresAt: { lt: now },
    },
    data: { isActive: false },
  })

  const stillActive = await prisma.offer.count({ where: { isActive: true } })

  return NextResponse.json({
    deactivated: result.count,
    active: stillActive,
    timestamp: now.toISOString(),
    message: `${result.count} offre(s) expirée(s) désactivée(s)`,
  })
}
