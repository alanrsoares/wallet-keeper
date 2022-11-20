import { test, expect } from "@playwright/test";

const BASE_URL =
  process.env["PLAYWRIGHT_TEST_BASE_URL"] ?? "http://localhost:3000";

test("homepage has title and links to intro page", async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/WalletKeeper/);

  const generateWalletEl = page.getByTestId("generate-wallet-card");

  expect(generateWalletEl).toBeTruthy();
});
