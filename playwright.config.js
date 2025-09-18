// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // 60s per test
  reporter: 'html',
  use: {
    headless: false,
    video: 'on',              // record all videos
    trace: 'on-first-retry',  // optional for debugging
  },

  projects: [
    // Test Suite 1: Mobile Chrome (Pixel 7) with UK settings
    {
      name: 'Mobile Chrome - t1',
      use: {
        ...devices['Pixel 7'],
        locale: 'en-GB',
        timezoneId: 'Europe/London',
        geolocation: { latitude: 51.5074, longitude: -0.1278 }, // London
        permissions: ['geolocation'],
      },
    },

    // Test Suite 2: Desktop Chrome
    {
      name: 'Desktop Chrome - t2',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
