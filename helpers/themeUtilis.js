// helpers/themeUtils.js
// Utilities for checking theme state in New Scientist site

async function getThemeClass(page) {
  // Returns the class attribute of the <html> element
  return await page.locator('html').getAttribute('class');
}

async function getThemeStorage(page) {
  // Returns the value of colourSchemeAppearance from localStorage
  return await page.evaluate(() => localStorage.getItem('colourSchemeAppearance'));
}

module.exports = { getThemeClass, getThemeStorage };
