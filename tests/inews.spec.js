// tests/inews.spec.js
const { test, expect } = require('@playwright/test');
const { waitForGAEvent } = require('../helpers/gaUtilis');

test.describe('iNews GA tracking tests', () => {
  test('Validate GA page_view before consent and user_engagement after consent', async ({ page }) => {
    // (Optional) debug: see every GA-ish request
    page.on('request', r => {
      if (r.url().includes('collect')) console.log('GA candidate:', r.url());
    });

    // page_view during navigation
    const [params] = await Promise.all([
      waitForGAEvent(page, 'page_view'),
      page.goto('https://inews.co.uk/category/news/politics', { waitUntil: 'domcontentloaded' }),
    ]);

    expect(params.get('ep.sub_channel_1')).toBe('news/politics');
    expect(params.get('gcs')).toBe('G101');
    expect(params.get('npa')).toBe('1');

    // accept consent and ensure banner is gone
    await page.getByRole('button', { name: /accept/i }).click();
    await expect(page.getByRole('button', { name: /accept/i })).toHaveCount(0);

    // user_engagement after consent (now captured from analytics.google.com too)
    const engagementParams = await waitForGAEvent(page, 'user_engagement');

    expect(engagementParams.get('gcs')).toBe('G111');
    const npa = engagementParams.get('npa');
    expect(npa === '0' || npa === null).toBeTruthy();
  });
});
