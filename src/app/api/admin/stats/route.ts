import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const [totalOffers, activeOffers, totalClicks, totalFavorites, recentOffers] = await Promise.all([
    prisma.offer.count(),
    prisma.offer.count({ where: { isActive: true } }),
    prisma.offer.aggregate({ _sum: { clicks: true } }),
    prisma.favorite.count(),
    prisma.offer.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { merchant: true, category: true },
    }),
  ])

  return NextResponse.json({
    totalOffers,
    activeOffers,
    totalClicks: totalClicks._sum.clicks || 0,
    totalFavorites,
    recentOffers: recentOffers.map(o => ({
      id: o.id,
      title: o.title,
      merchant: o.merchant.name,
      category: o.category.name,
      clicks: o.clicks,
      isActive: o.isActive,
      discountPrice: o.discountPrice,
      discount: o.discount,
      createdAt: o.createdAt.toISOString(),
    })),
  })
}
