import { test, expect } from '@playwright/test'

test.describe('API - Offres', () => {
  test('GET /api/offers retourne une liste d\'offres', async ({ request }) => {
    const response = await request.get('/api/offers')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('offers')
    expect(data).toHaveProperty('total')
    expect(Array.isArray(data.offers)).toBe(true)
    expect(data.total).toBeGreaterThan(0)
  })

  test('GET /api/offers accepte un paramètre de recherche', async ({ request }) => {
    const response = await request.get('/api/offers?search=iPhone')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('offers')
    expect(Array.isArray(data.offers)).toBe(true)
  })

  test('GET /api/offers accepte un filtre par catégorie', async ({ request }) => {
    const response = await request.get('/api/offers?category=high-tech')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.offers)).toBe(true)
    data.offers.forEach((offer: { category: { slug: string } }) => {
      expect(offer.category.slug).toBe('high-tech')
    })
  })

  test('GET /api/offers accepte un tri par réduction', async ({ request }) => {
    const response = await request.get('/api/offers?sort=discount')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.offers)).toBe(true)
  })

  test('GET /api/offers supporte la pagination', async ({ request }) => {
    const page1 = await request.get('/api/offers?page=1')
    const page2 = await request.get('/api/offers?page=2')
    expect(page1.status()).toBe(200)
    expect(page2.status()).toBe(200)
    const data1 = await page1.json()
    const data2 = await page2.json()
    expect(data1).toHaveProperty('totalPages')
    expect(data2).toHaveProperty('totalPages')
  })
})

test.describe('API - Catégories', () => {
  test('GET /api/categories retourne la liste des catégories', async ({ request }) => {
    const response = await request.get('/api/categories')
    expect(response.status()).toBe(200)
    const categories = await response.json()
    expect(Array.isArray(categories)).toBe(true)
    expect(categories.length).toBeGreaterThanOrEqual(5)
    const names = categories.map((c: { name: string }) => c.name)
    expect(names).toContain('High-Tech')
    expect(names).toContain('Mode')
    expect(names).toContain('Maison')
    expect(names).toContain('Alimentation')
    expect(names).toContain('Voyages')
  })
})

test.describe('API - Marchands', () => {
  test('GET /api/merchants retourne la liste des marchands', async ({ request }) => {
    const response = await request.get('/api/merchants')
    expect(response.status()).toBe(200)
    const merchants = await response.json()
    expect(Array.isArray(merchants)).toBe(true)
    expect(merchants.length).toBeGreaterThanOrEqual(5)
    const names = merchants.map((m: { name: string }) => m.name)
    expect(names).toContain('Amazon')
    expect(names).toContain('Cdiscount')
    expect(names).toContain('Fnac')
    expect(names).toContain('Darty')
    expect(names).toContain('La Redoute')
  })
})

test.describe('API - Favoris', () => {
  test('POST /api/favorites ajoute un favori', async ({ request }) => {
    const offersRes = await request.get('/api/offers')
    const { offers } = await offersRes.json()
    const offerId = offers[0].id

    const response = await request.post('/api/favorites', {
      data: { offerId, sessionId: 'test-session-playwright' },
    })
    expect(response.status()).toBe(200)
  })

  test('GET /api/favorites retourne les favoris d\'une session', async ({ request }) => {
    const response = await request.get('/api/favorites?sessionId=test-session-playwright')
    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
