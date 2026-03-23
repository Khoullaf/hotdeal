import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { Prisma } from '@prisma/client'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
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
  if (existing && existing.id !== id) {
    return NextResponse.json({ error: 'Ce slug est déjà utilisé' }, { status: 409 })
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), slug: slug.trim(), icon: icon || null, color: color || null },
    })
    return NextResponse.json(category)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 })
    }
    throw e
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const count = await prisma.offer.count({ where: { categoryId: id } })
  if (count > 0) {
    return NextResponse.json({ error: `Impossible de supprimer : ${count} offre(s) liée(s) à cette catégorie` }, { status: 409 })
  }
  try {
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      return NextResponse.json({ error: 'Catégorie introuvable' }, { status: 404 })
    }
    throw e
  }
}
