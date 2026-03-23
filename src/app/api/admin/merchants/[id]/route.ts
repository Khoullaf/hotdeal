import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const { name, slug, website, affiliateUrl, logo } = body

  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Le nom est obligatoire' }, { status: 400 })
  }
  if (!slug || !slug.trim()) {
    return NextResponse.json({ error: 'Le slug est obligatoire' }, { status: 400 })
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets' }, { status: 400 })
  }

  const existing = await prisma.merchant.findUnique({ where: { slug } })
  if (existing && existing.id !== id) {
    return NextResponse.json({ error: 'Ce slug est déjà utilisé' }, { status: 409 })
  }

  const merchant = await prisma.merchant.update({
    where: { id },
    data: {
      name: name.trim(),
      slug: slug.trim(),
      website: website || null,
      affiliateUrl: affiliateUrl || null,
      logo: logo || null,
    },
  })
  return NextResponse.json(merchant)
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const count = await prisma.offer.count({ where: { merchantId: id } })
  if (count > 0) {
    return NextResponse.json({ error: `Impossible de supprimer : ${count} offre(s) liée(s) à ce marchand` }, { status: 409 })
  }
  await prisma.merchant.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
