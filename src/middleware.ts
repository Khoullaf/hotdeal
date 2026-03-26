import { NextRequest, NextResponse } from 'next/server'

function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder()
  const aBytes = encoder.encode(a)
  const bBytes = encoder.encode(b)
  // Use constant-time comparison over the longer length to avoid timing leaks
  const len = Math.max(aBytes.length, bBytes.length)
  let diff = aBytes.length ^ bBytes.length
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0)
  }
  return diff === 0
}

export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD

  // If no password is configured, allow access (useful during development)
  if (!adminPassword) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="HotDeal Admin", charset="UTF-8"',
      },
    })
  }

  const base64Credentials = authHeader.slice('Basic '.length)
  const credentials = atob(base64Credentials)
  // Credentials format: "username:password"
  const colonIndex = credentials.indexOf(':')
  const password = colonIndex !== -1 ? credentials.slice(colonIndex + 1) : ''

  if (!timingSafeEqual(password, adminPassword)) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="HotDeal Admin", charset="UTF-8"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
