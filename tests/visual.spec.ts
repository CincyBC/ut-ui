import { test, expect } from "@playwright/test";

test.describe("component gallery visual regression", () => {
  test("light mode", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#light [data-component='BarChart'] rect.series-bar", { state: "attached" });
    await expect(page.locator("#light")).toHaveScreenshot("gallery-light.png", {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });

  test("dark mode", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#dark [data-component='BarChart'] rect.series-bar", { state: "attached" });
    await expect(page.locator("#dark")).toHaveScreenshot("gallery-dark.png", {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
});
