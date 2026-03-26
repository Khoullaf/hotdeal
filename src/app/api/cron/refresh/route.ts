import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function timingSafeStringEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder()
  const aBytes = encoder.encode(a)
  const bBytes = encoder.encode(b)
  const len = Math.max(aBytes.length, bBytes.length)
  let diff = aBytes.length ^ bBytes.length
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0)
  }
  return diff === 0
}

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = request.headers.get('Authorization') ?? ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!timingSafeStringEqual(token, cronSecret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const count = await prisma.offer.count({ where: { isActive: true } })
  return NextResponse.json({
    updated: count,
    timestamp: new Date().toISOString(),
    message: 'Offres mises à jour avec succès',
  })
}
