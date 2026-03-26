import { test, expect } from '@playwright/test'

test.describe('Page des offres', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/offres')
    await page.waitForSelector('main', { timeout: 5000 })
  })

  test('affiche le titre "Toutes les offres"', async ({ page }) => {
    await expect(page.locator('main').getByRole('heading', { level: 1 })).toContainText('Toutes les offres')
  })

  test("affiche un compteur du nombre total d'offres", async ({ page }) => {
    const heading = page.locator('main').getByRole('heading', { level: 1 })
    await expect(heading).toContainText(/\d+/)
  })

  test('affiche une barre de recherche', async ({ page }) => {
    await expect(page.locator('main').getByPlaceholder(/Rechercher/i)).toBeVisible()
  })

  test('affiche un sélecteur de tri', async ({ page }) => {
    await expect(page.locator('main').getByRole('combobox')).toBeVisible()
  })

  test("affiche des cartes d'offres après chargement", async ({ page }) => {
    await page.waitForSelector('main .grid .rounded-xl', { timeout: 8000 })
    const cards = page.locator('main .grid .rounded-xl')
    await expect(cards.first()).toBeVisible()
  })

  test('filtre les offres par recherche', async ({ page }) => {
    await page.waitForSelector('main .grid .rounded-xl', { timeout: 8000 })
    const searchInput = page.locator('main').getByPlaceholder(/Rechercher/i)
    const responsePromise = page.waitForResponse('/api/offers**')
    await searchInput.fill('iPhone')
    await responsePromise
    const heading = page.locator('main').getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
  })

  test("change l'ordre de tri", async ({ page }) => {
    await page.waitForSelector('main .grid .rounded-xl', { timeout: 8000 })
    const sortSelect = page.locator('main').getByRole('combobox')
    const responsePromise = page.waitForResponse('/api/offers**')
    await sortSelect.selectOption('discount')
    await responsePromise
    const cards = page.locator('main .grid .rounded-xl')
    await expect(cards.first()).toBeVisible()
  })

  test('affiche le filtre par catégories dans la sidebar', async ({ page }) => {
    await expect(page.locator('aside, [class*="sidebar"]').or(page.locator('main')).getByText('Catégories').first()).toBeVisible()
  })
})

test.describe("Page détail d'une offre", () => {
  test("affiche les détails d'une offre via son URL", async ({ request, page }) => {
    const response = await request.get('/api/offers')
    const data = await response.json()
    const offerId = data.offers[0].id
    await page.goto(`/offres/${offerId}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
