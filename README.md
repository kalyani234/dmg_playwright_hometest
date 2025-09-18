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
# Run all tests (both suites & both projects)
npx playwright test

# Run only Suite 1 (iNews – Mobile Chrome UK)
npx playwright test tests/inews.spec.js --project="Mobile Chrome - ts1" --headed

# Run only Suite 2 (New Scientist – Desktop Chrome)
npx playwright test tests/newscientist.spec.js --project="Desktop Chome - ts2" --headed

# Open HTML test report
npx playwright show-report playwright-reports



# Install Playwright browsers
npx playwright install
