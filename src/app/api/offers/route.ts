import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const merchant = searchParams.get('merchant')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const sort = searchParams.get('sort') || 'newest'
  const maxPrice = searchParams.get('maxPrice')
  const minDiscount = searchParams.get('minDiscount')
  const perPage = 10

  const where: Record<string, unknown> = { isActive: true }

  if (category) {
    where.category = { slug: category }
  }
  if (merchant) {
    where.merchant = { slug: merchant }
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }
  if (maxPrice) {
    where.discountPrice = { lte: parseFloat(maxPrice) }
  }
  if (minDiscount) {
    where.discount = { gte: parseInt(minDiscount) }
  }

  const orderBy: Record<string, string> =
    sort === 'popular' ? { clicks: 'desc' } :
    sort === 'discount' ? { discount: 'desc' } :
    { createdAt: 'desc' }

  const [offers, total] = await Promise.all([
    prisma.offer.findMany({
      where,
      include: { merchant: true, category: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.offer.count({ where }),
  ])

  const serialized = offers.map(o => ({
    ...o,
    expiresAt: o.expiresAt ? o.expiresAt.toISOString() : null,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    merchant: { name: o.merchant.name, slug: o.merchant.slug },
    category: {
      name: o.category.name,
      slug: o.category.slug,
      icon: o.category.icon,
      color: o.category.color,
    },
  }))

  return NextResponse.json({
    offers: serialized,
    total,
    page,
    totalPages: Math.ceil(total / perPage),
  })
}
