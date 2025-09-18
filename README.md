#  Playwright Home Test Project

##  Introduction
This project is a **home test assignment** built using [Playwright Test](https://playwright.dev/).  
It demonstrates how to validate **Google Analytics tracking** and **UI theme persistence** across real websites.  

---

##  Description
- **Test Suite 1 (iNews – Mobile Chrome UK)**  
  Validates Google Analytics (`page_view` before consent, `user_engagement` after consent) on  
  [https://inews.co.uk/category/news/politics](https://inews.co.uk/category/news/politics).  

- **Test Suite 2 (New Scientist – Desktop Chrome)**  
  Validates theme switching (Dark/Light mode), `localStorage` persistence, and consent modal handling on  
  [https://www.newscientist.com/](https://www.newscientist.com/).  

Both test suites include:
- **Network request inspection**
- **DOM assertions**
- **LocalStorage validation**
- **Mobile & Desktop browser emulation**

---

##  Tools & Technologies
- **Playwright Test** (`@playwright/test`)
- **JavaScript (Node.js ≥ 16)**
- **Browsers**: Chromium (Desktop & Mobile emulation)
- **Reports**: HTML reports with videos & traces enabled

---

### helpers/
- Contains **utility functions** used across test files.  
- Example: `gaUtils.js` → has a function `waitForGAEvent()` to **wait for Google Analytics requests** and parse query parameters.

### tests/
- Contains **test suites** written in Playwright.  
- `inews.spec.js`: Suite 1 tests GA tracking before/after consent modal.  
- `newscientist.spec.js`: Suite 2 tests theme switching and persistence.  

---

# Install Playwright browsers
npx playwright install
