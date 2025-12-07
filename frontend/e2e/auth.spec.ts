// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('User Login', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');

    // Ta de to første input-feltene som en enkel, robust start
    const allInputs = page.locator('input');
    await expect(allInputs).toHaveCount(
      2,
      { timeout: 5000 }
    );

    const emailInput = allInputs.nth(0);
    const passwordInput = allInputs.nth(1);

    await emailInput.fill('test@example.com');
    await passwordInput.fill('password123');

    const loginButton = page.getByRole('button', { name: /logg inn|log in|sign in/i });
    await loginButton.click();

    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/\/dashboard$/);

    await expect(
      page.getByRole('heading', { name: /dashboard|oversikt/i })
    ).toBeVisible();
  });

  test('invalid credentials show error and stay on login page', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');

    const allInputs = page.locator('input');
    await expect(allInputs).toHaveCount(
      2,
      { timeout: 5000 }
    );

    const emailInput = allInputs.nth(0);
    const passwordInput = allInputs.nth(1);

    await emailInput.fill('wrong@example.com');
    await passwordInput.fill('wrong-password');

    const loginButton = page.getByRole('button', { name: /logg inn|log in|sign in/i });
    await loginButton.click();

    // Vi forventer fortsatt å være på /login
    await expect(page).toHaveURL(/\/login$/);

    const errorMessage = page.getByText(/invalid email or password|feil e-post eller passord/i);
    await expect(errorMessage).toBeVisible();
  });
});
