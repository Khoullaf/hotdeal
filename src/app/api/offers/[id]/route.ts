import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const offer = await prisma.offer.findUnique({
    where: { id: params.id },
    include: { merchant: true, category: true },
  })

  if (!offer) {
    return NextResponse.json({ error: 'Offre non trouvée' }, { status: 404 })
  }

  const serialized = {
    ...offer,
    expiresAt: offer.expiresAt ? offer.expiresAt.toISOString() : null,
    createdAt: offer.createdAt.toISOString(),
    updatedAt: offer.updatedAt.toISOString(),
  }

  return NextResponse.json(serialized)
}
