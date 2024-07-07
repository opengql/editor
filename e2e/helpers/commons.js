/***
 * Selects all text using the keyboard shortcut (Ctrl + A) on the specified page.
 *
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<void>} - A promise that resolves when the shortcut action is complete.
 */
export const selectWholeShortcut = async (page) => {
  await page.keyboard.down('ControlLeft');
  await page.keyboard.press('a');
  await page.keyboard.up('ControlLeft');
};

/***
 * Clears the text of the currently focused input element on the specified page.
 *
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<void>} - A promise that resolves when the input has been cleared.
 */
export const clearFocusedInput = async (page) => {
  await selectWholeShortcut(page);
  await page.keyboard.press('Backspace');
};

/***
 * Clears the content of the editor by selecting the content and pressing backspace.
 *
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<void>} - A promise that resolves when the editor content is cleared.
 */
export const clearEditor = async (page) => {
  await page.click('#code-textarea--input');
  await clearFocusedInput(page);
};

/***
 * Retrieves all elements by their test ID on the specified page.
 *
 * @param {string} testId - The test ID of the elements to retrieve.
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<Array<import('puppeteer').ElementHandle<import('puppeteer').NodeFor<string>>>>} - A promise that resolves to an array of elements with the specified test ID.
 */
export const getElementsByTestId = async (testId, page) => page.$$(`[data-testid="${testId}"]`);

/***
 * Retrieves a single element by its test ID on the specified page.
 *
 * @param {string} testId - The test ID of the element to retrieve.
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<import('puppeteer').ElementHandle<import('puppeteer').NodeFor<string>>|undefined>} - A promise that resolves to the element with the specified test ID or undefined if not found.
 */
export const getElementByTestId = async (testId, page) => (await page.$(`[data-testid="${testId}"]`)) ?? undefined;

/***
 * Waits for an element with the specified test ID to appear on the specified page.
 *
 * @param {string} testId - The test ID of the element to wait for.
 * @param {import('puppeteer').Page} page - The page instance.
 * @returns {Promise<import('puppeteer').ElementHandle<import('puppeteer').NodeFor<string>>|undefined>} - A promise that resolves to the element with the specified test ID or undefined if not found.
 */
export const waitForElementByTestId = async (testId, page) =>
  (await page?.waitForSelector(`[data-testid="${testId}"]`)) ?? undefined;

/**
 * Clicks an element by its test ID on the specified page.
 *
 * @param {string} testId - The test ID of the element to click.
 * @param {import('puppeteer').Page} page - The page instance.
 * @param {Readonly<import('puppeteer').ClickOptions>} [options] - Optional click options.
 * @returns {Promise<void>} - A promise that resolves when the click action is complete.
 */
export const clickByTestId = async (testId, page, options) => page.click(`[data-testid="${testId}"]`, options);

/**
 * Waits for a specified number of milliseconds.
 *
 * @param {number} millis - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves when the specified time has elapsed.
 */
export const waitForMillis = async (millis) => new Promise((resolve) => setTimeout(resolve, millis));
