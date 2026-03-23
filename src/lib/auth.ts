import { createHash } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'admin_session'

export function computeToken(password: string): string {
  return createHash('sha256').update(password + ':hotdeal_admin').digest('hex')
}

export async function isAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE)
  if (!session) return false
  return session.value === computeToken(password)
}
