import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  // Go to https://habr.com/ru/all/
  await page.goto("https://habr.com/ru/users/Belisckner/favorites/posts/", { waitUntil: "domcontentloaded" });
  // Click [data-test-id="menu-toggle-guest"]
  await page.click('[data-test-id="menu-toggle-guest"]');
  // Click text=Войти
  await page.click("text=Войти");
  // Fill input[name="email"]
  await page.fill('input[name="email"]', "<your_email>");
  // Fill input[name="password"]
  await page.fill('input[name="password"]', "<your_password>");
  // Click text=Войти
  await page.waitForTimeout(3000);
  await page.click("text=Войти");
  await page.waitForTimeout(3000);
  // Click text=Убрать из закладок 315
  while ((await page.textContent('[class="tm-tabs__tab-counter"]')) != "") {
    while (await page.isVisible('[title="Убрать из закладок"]')) {
      await page.locator('[title="Убрать из закладок"]').nth(0).click();
      await page.waitForTimeout(50);
    }
    await page.reload();
  }
})();