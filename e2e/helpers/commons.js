export const selectWholeShortcut = async (page) => {
  await page.keyboard.down('ControlLeft');
  await page.keyboard.press('a');
  await page.keyboard.up('ControlLeft');
};

export const clearFocusedInput = async (page) => {
  await selectWholeShortcut(page);
  await page.keyboard.press('Backspace');
};

export const clearEditor = async (page) => {
  await page.click('#code-textarea--input');
  await clearFocusedInput(page);
};

export const getElementsByTestId = async (testId, page) => page.$$(`[data-testid="${testId}"]`);

export const getElementByTestId = async (testId, page) => (await page.$(`[data-testid="${testId}"]`)) ?? undefined;

export const waitForElementByTestId = async (testId, page) =>
  (await page?.waitForSelector(`[data-testid="${testId}"]`)) ?? undefined;

export const clickByTestId = async (testId, page, options) => page.click(`[data-testid="${testId}"]`, options);

export const switchLanguage = async (languageIndex, page) => {
  const options = ['latest.worker.js', 'pg-schema.worker.js'];
  await page.select('[data-testid="ti-worker-select"]', options[languageIndex]);
};

export const waitForMillis = async (millis) => new Promise((resolve) => setTimeout(resolve, millis));
