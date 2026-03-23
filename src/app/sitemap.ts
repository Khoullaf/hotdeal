import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotdeal.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [offers, categories, merchants] = await Promise.all([
    prisma.offer.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
    }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.merchant.findMany({ select: { slug: true } }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/offres`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/marchands`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const offerRoutes: MetadataRoute.Sitemap = offers.map((offer) => ({
    url: `${siteUrl}/offres/${offer.id}`,
    lastModified: offer.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const merchantRoutes: MetadataRoute.Sitemap = merchants.map((m) => ({
    url: `${siteUrl}/marchands/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  return [...staticRoutes, ...offerRoutes, ...categoryRoutes, ...merchantRoutes]
}
