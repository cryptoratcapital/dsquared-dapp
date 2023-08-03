import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: 1,
  reporter: "html",
  use: {
    headless: false,
    actionTimeout: 5 * 1000,
    baseURL: process.env.APP_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    permissions: ["clipboard-read"],
  },
  // start local web server before tests
  // webServer: [
  //   {
  //     command: "npm run dev",
  //     url: "http://localhost:3000",
  //     timeout: 20 * 1000,
  //     reuseExistingServer: true,
  //   },
  // ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  outputDir: "test-results",
})
