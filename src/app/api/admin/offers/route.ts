import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const offers = await prisma.offer.findMany({
    include: { merchant: true, category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(offers)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
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

  const offer = await prisma.offer.create({
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
  return NextResponse.json(offer, { status: 201 })
}
