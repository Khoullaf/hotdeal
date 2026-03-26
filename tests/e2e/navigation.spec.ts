import { test, expect } from '@playwright/test'

test.describe('Navigation et fonctionnalités transversales', () => {
  test('le header est visible sur toutes les pages', async ({ page }) => {
    for (const url of ['/', '/offres', '/categories', '/marchands']) {
      await page.goto(url)
      await expect(page.locator('header')).toBeVisible()
    }
  })

  test('le footer est visible sur toutes les pages', async ({ page }) => {
    for (const url of ['/', '/offres', '/categories', '/marchands']) {
      await page.goto(url)
      await expect(page.locator('footer')).toBeVisible()
    }
  })

  test('le lien Catégories du header renvoie vers /categories', async ({ page }) => {
    await page.goto('/')
    await page.locator('header nav').first().getByRole('link', { name: 'Catégories', exact: true }).click()
    await expect(page).toHaveURL('/categories')
  })

  test('le lien Marchands du header renvoie vers /marchands', async ({ page }) => {
    await page.goto('/')
    await page.locator('header nav').first().getByRole('link', { name: 'Marchands', exact: true }).click()
    await expect(page).toHaveURL('/marchands')
  })

  test("le logo HotDeal renvoie vers la page d'accueil", async ({ page }) => {
    await page.goto('/offres')
    await page.locator('header').getByRole('link', { name: /HotDeal/ }).click()
    await expect(page).toHaveURL('/')
  })

  test('le bouton favoris du header renvoie vers /favoris', async ({ page }) => {
    await page.goto('/')
    await page.locator('header a[href="/favoris"]').click()
    await expect(page).toHaveURL('/favoris')
  })

  test('le mode sombre se bascule via le bouton toggle', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const darkBtn = page.locator('header nav button').last()
    await expect(darkBtn).toBeVisible()
    const initialClass = await html.getAttribute('class') ?? ''
    await darkBtn.click()
    await page.waitForFunction(
      (prev) => document.documentElement.getAttribute('class') !== prev,
      initialClass
    )
    const newClass = await html.getAttribute('class') ?? ''
    expect(initialClass).not.toBe(newClass)
  })
})

test.describe('Page contact', () => {
  test('affiche le formulaire de contact', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { name: /contacter/i })).toBeVisible()
    await expect(page.getByLabel(/Nom/i)).toBeVisible()
    await expect(page.getByLabel(/e-mail/i)).toBeVisible()
    await expect(page.getByLabel(/Sujet/i)).toBeVisible()
    await expect(page.getByLabel(/Message/i)).toBeVisible()
  })
})

test.describe('Page favoris', () => {
  test('affiche la page favoris', async ({ page }) => {
    await page.goto('/favoris')
    await expect(page.locator('main').getByRole('heading', { level: 1 })).toBeVisible()
  })
})
