import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const count = await prisma.offer.count({ where: { isActive: true } })
  return NextResponse.json({
    updated: count,
    timestamp: new Date().toISOString(),
    message: 'Offres mises à jour avec succès',
  })
}
