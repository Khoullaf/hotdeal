import { NextRequest, NextResponse } from 'next/server'

const ADMIN_COOKIE = 'admin_session'

// Note: This mirrors computeToken in src/lib/auth.ts but uses the Web Crypto API
// because Next.js middleware runs in the Edge runtime which does not support
// Node.js built-in modules (such as 'crypto').
async function computeToken(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + ':hotdeal_admin')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('setup', '1')
    return NextResponse.redirect(url)
  }

  const sessionCookie = request.cookies.get(ADMIN_COOKIE)
  if (!sessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  const expectedToken = await computeToken(adminPassword)
  if (sessionCookie.value !== expectedToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
