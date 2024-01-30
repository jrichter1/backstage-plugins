import { test, expect } from '@playwright/test';

test('demo', async ({ page }) => {
  await page.goto('http://localhost:3000/quay');

  expect(page.getByText('Security Scan')).toBeVisible();
  await page.getByRole('link', { name: 'High' }).first().click();

  await expect(page.getByText('CVE')).toHaveCount(5);
});

