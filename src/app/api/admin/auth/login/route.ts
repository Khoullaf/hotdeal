import { NextRequest, NextResponse } from 'next/server'
import { computeToken, ADMIN_COOKIE } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD non configuré dans .env' },
      { status: 503 }
    )
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { error: 'Mot de passe incorrect' },
      { status: 401 }
    )
  }

  const token = computeToken(adminPassword)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return response
}
