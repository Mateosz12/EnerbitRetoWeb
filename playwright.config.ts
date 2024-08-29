import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30000,
  expect: {
    timeout: 30000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {open: 'never'}],
    ['junit', {outputFile: './playwright-report/results.xml'} ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   
    trace: 'on',
    navigationTimeout: 30000,
    headless: false,
    ignoreHTTPSErrors: false,

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        viewport: null,
        channel: "chrome",
        launchOptions: {
          args: ["--start-maximized"]
        }
       },
    },

 
  ],


});
