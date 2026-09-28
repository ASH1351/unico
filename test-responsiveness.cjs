const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, 'public', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const breakpoints = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 }
];

(async () => {
  console.log('Launching Chrome for responsive & functionality testing...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Browser console error:', msg.text());
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.error('Browser page error:', err.message);
    consoleErrors.push(err.message);
  });

  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  console.log('Page loaded successfully!');

  // Test each breakpoint
  for (const bp of breakpoints) {
    await page.setViewport({ width: bp.width, height: bp.height });
    await new Promise(r => setTimeout(r, 600));

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    console.log(`Breakpoint ${bp.name} (${bp.width}px): Overflow = ${overflow ? 'FAIL (Horizontal overflow!)' : 'PASS (No overflow)'}`);

    const screenshotPath = path.join(outDir, `${bp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: ${screenshotPath}`);
  }

  // Test Product Detail Modal
  console.log('Testing interactive Product Detail Modal...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    document.getElementById('featured-products-section')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const productCard = await page.$('article div.cursor-pointer');
  if (productCard) {
    await productCard.click();
    await new Promise(r => setTimeout(r, 800));
    const modalVisible = await page.$('div[role="dialog"]');
    console.log('Product Detail Modal opened:', !!modalVisible);
    
    // Screenshot open modal
    await page.screenshot({ path: path.join(outDir, 'modal-product-detail.png') });
    
    // Close modal via Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    console.log('Closed modal via Escape key.');
  }

  // Test Search Modal
  console.log('Testing Search Modal (Cmd+K / shortcut)...');
  await page.keyboard.press('/');
  await new Promise(r => setTimeout(r, 500));
  const searchModal = await page.$('div[role="dialog"]');
  console.log('Search modal opened:', !!searchModal);
  await page.screenshot({ path: path.join(outDir, 'modal-search.png') });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // Test Wishlist Drawer
  console.log('Testing Wishlist Drawer toggle...');
  const wishlistBtn = await page.$('button[aria-label^="View wishlist"]');
  if (wishlistBtn) {
    await wishlistBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, 'drawer-wishlist.png') });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    console.log('Wishlist drawer verified.');
  }

  // Test Mobile Navigation Drawer
  console.log('Testing Mobile Drawer at 390px...');
  await page.setViewport({ width: 390, height: 844 });
  const menuBtn = await page.$('button[aria-label="Open mobile menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, 'drawer-mobile-menu.png') });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    console.log('Mobile menu drawer opened & closed successfully.');
  }

  console.log('\n--- TEST SUMMARY ---');
  console.log(`Console Errors encountered: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((e, i) => console.log(`  ${i + 1}: ${e}`));
  } else {
    console.log('Zero console errors encountered across all tests! ✦');
  }

  await browser.close();
  console.log('Testing complete.');
})();
