import { expect, test } from '@playwright/test';

test('demo', async ({ page }) => {
  await page.goto('http://localhost:3000/quay');

  expect(page.getByText('Security Scan')).toBeVisible({ timeout: 20000 });
  await page.getByRole('link', { name: 'High' }).first().click();

  await expect(page.getByText('CVE')).toHaveCount(5, { timeout: 20000 });
});
