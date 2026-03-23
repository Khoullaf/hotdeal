import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const categories = await prisma.category.findMany({
    include: { _count: { select: { offers: true } } },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json()
  const { name, slug, icon, color } = body

  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Le nom est obligatoire' }, { status: 400 })
  }
  if (!slug || !slug.trim()) {
    return NextResponse.json({ error: 'Le slug est obligatoire' }, { status: 400 })
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets' }, { status: 400 })
  }

  const existing = await prisma.category.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'Ce slug est déjà utilisé' }, { status: 409 })
  }

  const category = await prisma.category.create({
    data: { name: name.trim(), slug: slug.trim(), icon: icon || null, color: color || null },
  })
  return NextResponse.json(category, { status: 201 })
}
