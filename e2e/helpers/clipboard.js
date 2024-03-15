import { environment } from './environment';

export const overrideClipboardPermissions = async (browser) => {
  const context = await browser.defaultBrowserContext();

  await context.overridePermissions(environment.websiteUrl, [
    'clipboard-read',
    'clipboard-write',
    'clipboard-sanitized-write',
  ]);
};

export const getClipboardValue = async (browser, page) => {
  return await page.evaluate(`(async () => await navigator.clipboard.readText())()`);
};

export const waitForClipboardValueToChange = async (browser, page) => {
  const initialValue = await getClipboardValue(browser, page);
  let nextValue = initialValue;

  while (initialValue === nextValue) {
    nextValue = await getClipboardValue(browser, page);
  }
};
