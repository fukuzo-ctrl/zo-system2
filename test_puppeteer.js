const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/zo_system_private.html.html');
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.waitForSelector('#btn-proc');
  console.log("Found proc button. Clicking...");
  await page.click('#btn-proc');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
