import { test, expect } from '@playwright/test'

test.describe('Page des marchands', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/marchands')
  })

  test('affiche le titre "Marchands"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Marchands/i })).toBeVisible()
  })

  test('affiche les marchands disponibles', async ({ page }) => {
    const merchantLinks = page.locator('a[href^="/marchands/"]')
    await expect(merchantLinks.first()).toBeVisible()
    expect(await merchantLinks.count()).toBeGreaterThanOrEqual(1)
  })

  test('affiche les 5 marchands attendus', async ({ page }) => {
    await expect(page.getByText('Amazon')).toBeVisible()
    await expect(page.getByText('Cdiscount')).toBeVisible()
    await expect(page.getByText('Fnac')).toBeVisible()
    await expect(page.getByText('Darty')).toBeVisible()
    await expect(page.getByText('La Redoute')).toBeVisible()
  })

  test('navigue vers une page marchand en cliquant dessus', async ({ page }) => {
    const firstMerchantLink = page.locator('a[href^="/marchands/"]').first()
    await firstMerchantLink.click()
    await expect(page).toHaveURL(/\/marchands\/[\w-]+/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})

test.describe('Page marchand Amazon', () => {
  test('affiche les offres du marchand Amazon', async ({ page }) => {
    await page.goto('/marchands/amazon')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Amazon/i)
    await page.waitForSelector('.rounded-xl', { timeout: 5000 })
    const cards = page.locator('.grid .rounded-xl')
    await expect(cards.first()).toBeVisible()
  })
})
