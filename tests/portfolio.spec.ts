import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { projects, profile } from '../src/data'

test('portfolio renders without runtime errors or horizontal overflow', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page).toHaveTitle('Nitesh Kumar | Software Developer')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building APIs.')
  for (const section of ['about', 'projects', 'experience', 'skills', 'education', 'achievements', 'contact']) {
    await expect(page.locator(`#${section}`)).toBeAttached()
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.locator('.hero').screenshot({ path: testInfo.outputPath('hero.png'), scale: 'css' })
  await page.screenshot({ path: testInfo.outputPath('portfolio.png'), fullPage: true, scale: 'css' })
  expect(errors).toEqual([])
})

test('project details expand and resume download serves the original PDF', async ({ page, request }) => {
  await page.goto('/')
  const details = page.getByRole('button', { name: 'Engineering details' }).first()
  await details.click()
  await expect(details).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText('Added automatic key expiration')).toBeVisible()
  await details.click()
  await expect(details).toHaveAttribute('aria-expanded', 'false')
  const pdf = await request.get('/resume.pdf')
  expect(pdf.ok()).toBe(true)
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-')
  expect(await pdf.body()).toEqual(readFileSync('public/resume.pdf'))
  await expect(page.getByRole('link', { name: 'Download resume', exact: true }).first()).toHaveAttribute('download', 'Nitesh-Kumar-Resume.pdf')
})

test('navigation and contact links work at the active viewport', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Projects' }).click()
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false')
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
  }
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('link', { name: 'Say hello' })).toHaveAttribute('href', 'mailto:niteshku23@iitk.ac.in')
  await expect(page.getByRole('link', { name: 'GitHub profile (opens in a new tab)' }).first()).toHaveAttribute('href', 'https://github.com/niteshkumar0609')
  await expect(page.getByRole('link', { name: 'LinkedIn profile (opens in a new tab)' }).first()).toHaveAttribute('href', profile.linkedin)
})

test('all project cards expand and reveal animations settle while scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  for (const section of ['about', 'experience', 'skills', 'education', 'achievements', 'contact']) {
    const heading = page.locator(`#${section} h2`)
    await heading.scrollIntoViewIfNeeded()
    const reveal = page.locator(`#${section} .section-heading, #${section} .about-grid, #${section} > div`).first()
    await expect(reveal).toHaveCSS('opacity', '1')
  }
  const cards = page.locator('.project-card')
  await expect(cards).toHaveCount(projects.length)
  for (let index = 0; index < projects.length; index++) {
    const card = cards.nth(index)
    await card.scrollIntoViewIfNeeded()
    await expect(card).toHaveCSS('opacity', '1')
    await card.getByRole('button', { name: 'Engineering details' }).click()
    await expect(card.locator('.project-details')).toBeVisible()
    await expect(card.locator('.project-details li')).toHaveCount(projects[index].details.length)
  }
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test('resume is downloadable and copy email reports success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  const downloadPending = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download resume', exact: true }).first().click()
  const download = await downloadPending
  expect(download.suggestedFilename()).toMatch(/\.pdf$/i)
  expect(await download.failure()).toBeNull()
  const downloadPath = await download.path()
  if (!downloadPath) throw new Error('Resume download did not produce a local file')
  expect(readFileSync(downloadPath)).toEqual(readFileSync('public/resume.pdf'))
  await page.getByRole('button', { name: 'Copy email' }).click()
  await expect(page.getByRole('status')).toHaveText('Email address copied to clipboard.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email)
})

test('portrait loads efficiently and respects reduced motion', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const portrait = page.getByRole('img', { name: 'Professional portrait of Nitesh Kumar, wearing glasses and a checkered shirt' })
  await expect(portrait).toBeVisible()
  await expect.poll(() => portrait.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  expect(await portrait.evaluate(image => (image as HTMLImageElement).currentSrc)).toMatch(/profile-(480|800)\.webp$/)
  await expect(portrait).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('.portrait-halo')).toHaveCSS('animation-name', 'none')
  const fallback = await request.get('/images/profile.jpg')
  expect(fallback.ok()).toBe(true)
  expect(fallback.headers()['content-type']).toContain('image/jpeg')
  expect((await fallback.body()).subarray(0, 2).toString('hex')).toBe('ffd8')
  expect(await page.evaluate(async () => {
    const image = new Image()
    image.src = '/images/profile.jpg'
    await image.decode()
    return image.naturalWidth > 0 && image.naturalHeight > 0
  })).toBe(true)
})
