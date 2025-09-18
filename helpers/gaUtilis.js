// helpers/gaUtils.js
// Wait for a GA hit with a specific `en` value and return URLSearchParams.
// Matches multiple GA hosts (analytics.google.com, google-analytics.com, doubleclick.net)
// and any regional subdomain (e.g., region1.*).

function isGAUrl(url) {
  if (!url.includes('collect')) return false; // fast path
  try {
    const { host, pathname } = new URL(url);
    const hostOk =
      host.includes('analytics.google.com') ||         // e.g., region1.analytics.google.com
      host.includes('google-analytics.com') ||         // e.g., www.google-analytics.com
      host.includes('doubleclick.net');                // e.g., stats.g.doubleclick.net
    const pathOk = pathname.includes('/collect');      // usually /g/collect or /j/collect
    return hostOk && pathOk;
  } catch {
    return false;
  }
}

async function waitForGAEvent(page, eventName, { timeout = 20000 } = {}) {
  const req = await page.waitForRequest((r) => {
    const url = r.url();
    if (!isGAUrl(url)) return false;
    try {
      const sp = new URL(url).searchParams;
      return sp.get('en') === eventName;
    } catch {
      return false;
    }
  }, { timeout });

  // Optional debug
  console.log(`✅ GA Event captured: ${req.url()}`);

  return new URL(req.url()).searchParams;
}

module.exports = { waitForGAEvent };
