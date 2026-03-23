import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const {
    title, description, originalPrice, discountPrice, discount,
    imageUrl, affiliateUrl, sourceUrl, categoryId, merchantId,
    expiresAt, isActive, isFeatured,
  } = body

  if (!title || !title.trim()) {
    return NextResponse.json({ error: 'Le titre est obligatoire' }, { status: 400 })
  }
  if (!affiliateUrl || !affiliateUrl.trim()) {
    return NextResponse.json({ error: "L'URL d'affiliation est obligatoire" }, { status: 400 })
  }
  if (discountPrice === undefined || discountPrice === null || isNaN(Number(discountPrice))) {
    return NextResponse.json({ error: 'Le prix remisé est obligatoire' }, { status: 400 })
  }
  if (!categoryId) {
    return NextResponse.json({ error: 'La catégorie est obligatoire' }, { status: 400 })
  }
  if (!merchantId) {
    return NextResponse.json({ error: 'Le marchand est obligatoire' }, { status: 400 })
  }

  const offer = await prisma.offer.update({
    where: { id },
    data: {
      title: title.trim(),
      description: (description || '').trim(),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      discountPrice: Number(discountPrice),
      discount: discount ? Number(discount) : null,
      imageUrl: imageUrl || null,
      affiliateUrl: affiliateUrl.trim(),
      sourceUrl: sourceUrl || null,
      categoryId,
      merchantId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: isActive !== false,
      isFeatured: isFeatured === true,
    },
  })
  return NextResponse.json(offer)
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  await prisma.$transaction([
    prisma.clickLog.deleteMany({ where: { offerId: id } }),
    prisma.favorite.deleteMany({ where: { offerId: id } }),
    prisma.offer.delete({ where: { id } }),
  ])
  return NextResponse.json({ ok: true })
}
