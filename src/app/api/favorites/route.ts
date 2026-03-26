import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MAX_OFFER_IDS = 50

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  const offerIds = searchParams.get('offerIds')

  if (offerIds) {
    const ids = offerIds.split(',').filter(Boolean).slice(0, MAX_OFFER_IDS)
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
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  const { offerId, sessionId } = body as Record<string, unknown>

  if (typeof offerId !== 'string' || !offerId.trim()) {
    return NextResponse.json({ error: 'offerId invalide' }, { status: 400 })
  }
  if (typeof sessionId !== 'string' || !sessionId.trim()) {
    return NextResponse.json({ error: 'sessionId invalide' }, { status: 400 })
  }

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
