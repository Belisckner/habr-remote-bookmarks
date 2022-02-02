import { chromium } from "playwright";

const email = "email";
const password = "password";
const nickname = "nick";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  // Go to https://habr.com/ru/all/
  await page.goto(`https://habr.com/ru/users/${nickname}/favorites/posts/`, { waitUntil: "domcontentloaded" });
  // Click [data-test-id="menu-toggle-guest"]
  await page.click('[data-test-id="menu-toggle-guest"]');
  // Click text=Войти
  await page.click("text=Войти");
  // Fill input[name="email"]
  await page.fill('input[name="email"]', email);
  // Fill input[name="password"]
  await page.fill('input[name="password"]', password);
  // Click text=Войти
  await page.waitForTimeout(1000);
  await page.click("text=Войти");
  await page.waitForTimeout(2000);
  // Click text=Убрать из закладок 315
  await page.waitForURL(`https://habr.com/ru/users/${nickname}/favorites/posts/`)
  while (await page.locator('article').nth(0).isVisible()) {
    while (await page.isVisible('[title="Убрать из закладок"]')) {
      await page.locator('[title="Убрать из закладок"]').nth(0).click();
      await page.waitForTimeout(50);
    }
    await page.reload();
  }
  await browser.close();
})();