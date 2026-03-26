import { test, expect } from '@playwright/test'

test.describe('Page des catégories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories')
  })

  test('affiche le titre "Toutes les catégories"', async ({ page }) => {
    await expect(page.locator('main').getByRole('heading', { level: 1 })).toContainText('catégories')
  })

  test('affiche les catégories disponibles', async ({ page }) => {
    const categoryLinks = page.locator('main a[href^="/categories/"]')
    await expect(categoryLinks.first()).toBeVisible()
    expect(await categoryLinks.count()).toBeGreaterThanOrEqual(1)
  })

  test('affiche les 5 catégories attendues', async ({ page }) => {
    const main = page.locator('main')
    await expect(main.getByText('High-Tech')).toBeVisible()
    await expect(main.getByText('Mode')).toBeVisible()
    await expect(main.getByText('Maison')).toBeVisible()
    await expect(main.getByText('Alimentation')).toBeVisible()
    await expect(main.getByText('Voyages')).toBeVisible()
  })

  test('navigue vers une page de catégorie en cliquant dessus', async ({ page }) => {
    const firstCategoryLink = page.locator('main a[href^="/categories/"]').first()
    await firstCategoryLink.click()
    await expect(page).toHaveURL(/\/categories\/[\w-]+/)
    await expect(page.locator('main').getByRole('heading', { level: 1 })).toBeVisible()
  })
})

test.describe('Page catégorie High-Tech', () => {
  test('affiche les offres de la catégorie High-Tech', async ({ page }) => {
    await page.goto('/categories/high-tech')
    await expect(page.locator('main').getByRole('heading', { level: 1 })).toContainText(/High-Tech/i)
    await page.waitForSelector('main .rounded-xl', { timeout: 5000 })
    const cards = page.locator('main .grid .rounded-xl')
    await expect(cards.first()).toBeVisible()
  })
})
