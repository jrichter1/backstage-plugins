import { expect, test } from '@playwright/test';

test('kokot', async ({ page }) => {
  await page.goto('localhost:3000');
  await page.waitForTimeout(10000);
});
