// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

// Define a test user for consistent testing
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || 'test@example.com';
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || 'password123';
const INVALID_USER_EMAIL = 'invalid@example.com';
const INVALID_USER_PASSWORD = 'wrongpassword';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure we start from a logged out state for most tests
    await page.goto('/login');
    // Clear any existing session or local storage for a clean state
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.goto('/login'); // Go to login page after clearing storage
  });

  test('should allow a user to log in successfully and redirect to dashboard (AC2, AC3, AC4)', async ({ page }) => {
    await page.fill('input[type="email"]', TEST_USER_EMAIL);
    await page.fill('input[type="password"]', TEST_USER_PASSWORD);
    await page.click('button:has-text("Login")');

    // Expect to be redirected to the dashboard
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    // Expect dashboard specific UI elements to be visible (AC4)
    await expect(page.getByRole('heading', { name: 'Welcome to the Dashboard!' })).toBeVisible();

    // Verify session persistence (AC3) - reload page and check if still logged in
    await page.reload();
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Welcome to the Dashboard!' })).toBeVisible();
  });

  test('should show an error message for invalid credentials and not redirect (AC2, AC4)', async ({ page }) => {
    await page.fill('input[type="email"]', INVALID_USER_EMAIL);
    await page.fill('input[type="password"]', INVALID_USER_PASSWORD);
    await page.click('button:has-text("Login")');

    // Expect to remain on the login page
    await expect(page).toHaveURL('/login');

    // Expect an error message to be displayed (AC1, AC4)
    await expect(page.getByRole('alert', { name: 'Login Failed' })).toBeVisible();
    await expect(page.locator('.text-sm.text-red-500')).toContainText('Invalid login credentials'); // Adjust text based on actual error message from Supabase

    // Ensure dashboard specific UI elements are NOT visible
    await expect(page.getByRole('heading', { name: 'Welcome to the Dashboard!' })).not.toBeVisible();
  });

  test('should redirect authenticated user from login page to dashboard (AC2)', async ({ page }) => {
    // First, log in successfully
    await page.fill('input[type="email"]', TEST_USER_EMAIL);
    await page.fill('input[type="password"]', TEST_USER_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    // Now, try to navigate back to the login page
    await page.goto('/login');
    // Expect to be redirected back to the dashboard immediately
    await expect(page).toHaveURL('/dashboard');
  });

  test('should redirect unauthenticated user from protected page to login (AC2)', async ({ page }) => {
    // Ensure user is logged out (already done in beforeEach but good for clarity)
    // Try to access a protected page directly
    await page.goto('/dashboard');

    // Expect to be redirected to the login page
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');

    // Ensure dashboard specific UI elements are NOT visible
    await expect(page.getByRole('heading', { name: 'Welcome to the Dashboard!' })).not.toBeVisible();
  });

  test('should allow logout and redirect to login page (AC2)', async ({ page }) => {
    // First, log in successfully
    await page.fill('input[type="email"]', TEST_USER_EMAIL);
    await page.fill('input[type="password"]', TEST_USER_PASSWORD);
    await page.click('button:has-text("Login")');
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    // Perform logout action
    await page.click('button:has-text("Logout")');

    // Expect to be redirected to the login page
    await page.waitForURL('/login');
    await expect(page).toHaveURL('/login');

    // Ensure dashboard is no longer accessible without login
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });
});