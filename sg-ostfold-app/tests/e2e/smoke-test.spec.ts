const fetch = (...args: Parameters<typeof import('node-fetch')['default']>) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const APP_URL = process.env.E2E_APP_URL || 'http://localhost:3000';

describe('E2E Smoke Test', () => {
  it('should display "Application successfully deployed." on the homepage', async () => {
    try {
      const response = await fetch(APP_URL);
      expect(response.ok).toBe(true);
      const text = await response.text();
      expect(text).toContain('Application successfully deployed.');
    } catch (error) {
      throw new Error(`Failed to fetch ${APP_URL}. Make sure the application is running. Error: ${error}`);
    }
  }, 15000); // Increase timeout for E2E test
});
