import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  const offerIds = searchParams.get('offerIds')

  if (offerIds) {
    const ids = offerIds.split(',').filter(Boolean)
    const offers = await prisma.offer.findMany({
      where: { id: { in: ids }, isActive: true },
      include: { merchant: true, category: true },
    })
    const serialized = offers.map(o => ({
      ...o,
      expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
      merchant: { name: o.merchant.name, slug: o.merchant.slug },
      category: { name: o.category.name, slug: o.category.slug, icon: o.category.icon, color: o.category.color },
    }))
    return NextResponse.json(serialized)
  }

  if (!sessionId) return NextResponse.json([])

  const favorites = await prisma.favorite.findMany({
    where: { sessionId },
    include: { offer: { include: { merchant: true, category: true } } },
  })

  return NextResponse.json(favorites)
}

export async function POST(request: NextRequest) {
  const { offerId, sessionId } = await request.json()

  const existing = await prisma.favorite.findUnique({
    where: { offerId_sessionId: { offerId, sessionId } },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
    return NextResponse.json({ action: 'removed' })
  } else {
    await prisma.favorite.create({ data: { offerId, sessionId } })
    return NextResponse.json({ action: 'added' })
  }
}
