import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => ({}))
  const sessionId = body.sessionId || null
  const userAgent = request.headers.get('user-agent') || null

  const offer = await prisma.offer.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!offer) {
    return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
  }

  await Promise.all([
    prisma.offer.update({
      where: { id: params.id },
      data: { clicks: { increment: 1 } },
    }),
    prisma.clickLog.create({
      data: { offerId: params.id, sessionId, userAgent },
    }),
  ])

  return NextResponse.json({ success: true })
}
