import { environment } from '$e2e/helpers/environment';

/***
 * Overrides the clipboard permissions for the specified browser.
 *
 * @param {import('puppeteer').Browser} browser - The browser instance.
 * @returns {Promise<void>} - A promise that resolves when the permissions have been overridden.
 */
export const overrideClipboardPermissions = async (browser) => {
  const context = await browser.defaultBrowserContext();

  await context.overridePermissions(environment.websiteUrl, [
    'clipboard-read',
    'clipboard-write',
    'clipboard-sanitized-write',
  ]);
};

/***
 * Retrieves the current value from the clipboard.
 *
 * @param {import('puppeteer').Browser} browser - The browser instance.
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<string>} - A promise that resolves to the current clipboard value.
 */
export const getClipboardValue = async (browser, page) => {
  return await page.evaluate(`(async () => await navigator.clipboard.readText())()`);
};

/**
 * Waits for the clipboard value to change from its initial value.
 *
 * @param {import('puppeteer').Browser} browser - The browser instance.
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<void>} - A promise that resolves when the clipboard value has changed.
 */
export const waitForClipboardValueToChange = async (browser, page) => {
  const initialValue = await getClipboardValue(browser, page);
  let nextValue = initialValue;

  while (initialValue === nextValue) {
    nextValue = await getClipboardValue(browser, page);
  }
};
