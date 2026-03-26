import { test, expect } from '@playwright/test'

test.describe("Page d'accueil", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test("affiche le titre du site dans l'onglet", async ({ page }) => {
    await expect(page).toHaveTitle(/HotDeal/)
  })

  test('affiche le logo HotDeal dans le header', async ({ page }) => {
    await expect(page.locator('header').getByRole('link', { name: /HotDeal/ })).toBeVisible()
  })

  test('affiche la barre de navigation principale', async ({ page }) => {
    const nav = page.locator('header nav').first()
    await expect(nav.getByRole('link', { name: 'Offres', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Catégories', exact: true })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Marchands', exact: true })).toBeVisible()
  })

  test('affiche la section hero avec le slogan et le bouton CTA', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('bons plans')
    await expect(page.getByRole('link', { name: /Voir toutes les offres/ })).toBeVisible()
  })

  test('affiche la section "Coups de cœur" avec des offres', async ({ page }) => {
    await expect(page.locator('main').getByText('Coups de cœur')).toBeVisible()
    const offerCards = page.locator('main .grid .rounded-xl')
    await expect(offerCards.first()).toBeVisible()
  })

  test('affiche la section catégories avec au moins une catégorie', async ({ page }) => {
    await expect(page.locator('main').getByText('Catégories').first()).toBeVisible()
    const categoryLinks = page.locator('main a[href^="/categories/"]')
    await expect(categoryLinks.first()).toBeVisible()
  })

  test('affiche la section "Offres récentes"', async ({ page }) => {
    await expect(page.locator('main').getByText('Offres récentes')).toBeVisible()
  })

  test('le bouton CTA renvoie vers la page des offres', async ({ page }) => {
    await page.getByRole('link', { name: /Voir toutes les offres/ }).click()
    await expect(page).toHaveURL('/offres')
  })

  test('le lien "Offres" du header renvoie vers /offres', async ({ page }) => {
    await page.locator('header nav').first().getByRole('link', { name: 'Offres', exact: true }).click()
    await expect(page).toHaveURL('/offres')
  })
})
