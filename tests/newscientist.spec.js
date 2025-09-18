// tests/newscientist.spec.js

const { test, expect } = require('@playwright/test');

test.describe('New Scientist Dark/Light mode tests', () => {
  test('Validate theme toggle and persistence', async ({ page }) => {
    await page.goto('https://www.newscientist.com/', { waitUntil: 'domcontentloaded' });

    const html = page.locator('html');

    // 1. Detect current theme (Dark or Light)
    const initialClass = await html.getAttribute('class');
    console.log('Initial <html> class =', initialClass);

    // 2. Check localStorage value
    const initialScheme = await page.evaluate(() => localStorage.getItem('colourSchemeAppearance'));
    console.log('Initial colourSchemeAppearance =', initialScheme);

    // Ensure we at least have a theme class
    expect(initialClass).toMatch(/Dark|Light/);

    // 3. Handle consent modal
    const gotItBtn = page.getByRole('button', { name: /got it/i });
    if (await gotItBtn.isVisible()) {
      await gotItBtn.click();
      await expect(gotItBtn).toHaveCount(0);
    }

    // 4. Toggle theme
    const toggle = page.locator('#appearance-toggle');
    await toggle.click();

    // 5. After toggle: confirm opposite theme
    const toggledClass = await html.getAttribute('class');
    console.log('Toggled <html> class =', toggledClass);

    if (initialClass.includes('Dark')) {
      expect(toggledClass).toMatch(/Light/);
    } else {
      expect(toggledClass).toMatch(/Dark/);
    }

    // 6. Verify localStorage updated
    const updatedScheme = await page.evaluate(() => localStorage.getItem('colourSchemeAppearance'));
    console.log('Updated colourSchemeAppearance =', updatedScheme);
    expect(updatedScheme).toMatch(/Dark|Light/);

    // 7. Refresh and confirm persistence
    await page.reload({ waitUntil: 'domcontentloaded' });
    const reloadedClass = await html.getAttribute('class');
    console.log('Reloaded <html> class =', reloadedClass);
    expect(reloadedClass).toContain(updatedScheme);
  });
});
