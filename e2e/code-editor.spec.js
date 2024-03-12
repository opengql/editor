import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';
import { environment } from './helpers/environment';
import { clearEditor, getElementByTestId, waitForElementByTestId, waitForMillis } from './helpers/commons';

const feature = loadFeature('./e2e/feature/code-editor.feature');

defineFeature(feature, (test) => {
  let browser;
  let page;

  beforeAll(async () => {
    // browser = await puppeteer.launch({ headless: 'new' });
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('entering new text to the editor', ({ given, when, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when(/^the editor's empty and the user inputs "(.*)" into the editor$/, async (input) => {
      await page.click('#code-textarea--input', { count: 3 });
      await page.keyboard.press('Backspace');
      await page.type('#code-textarea--input', input);
      await waitForMillis(200);
      await page.keyboard.press('Escape');
      await page.keyboard.press('Enter');
      await waitForElementByTestId('ti-parsing-status--label-parsing', page);
      await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
    });

    then(/^the editor's value changes to "(.*)" and provided input is valid$/, async (input) => {
      const editorValue = await page.$eval('#code-textarea--input', (element) => element.textContent);
      expect(editorValue).not.toBeNull();
      expect(editorValue?.trim()).toBe(input);
    });
  });

  test('entering new invalid text to the editor', ({ given, when, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when(/^the editor's empty and the user inputs "(.*)" into the editor$/, async (input) => {
      await page.click('#code-textarea--input', { count: 3 });
      await page.keyboard.press('Backspace');
      await page.type('#code-textarea--input', input);
      await page.keyboard.press('Escape');
      await page.keyboard.press('Enter');
      await waitForElementByTestId('ti-parsing-status--label-parsing', page);
      await waitForElementByTestId('ti-parsing-status--label-errors', page);
    });

    then(/^the editor's value changes to "(.*)" and provided input is valid$/, async (input) => {
      const editorValue = await page.$eval('#code-textarea--input', (element) => element.textContent);
      expect(editorValue).not.toBeNull();
      expect(editorValue?.trim()).toBe(input);
    });
  });

  test('render errors for invalid input', ({ given, when, and, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides invalid input', async () => {
      await page.type('#code-textarea--input', 'ma tch session for example');
    });

    and('the input is parsed', async () => {
      await waitForElementByTestId('ti-parsing-status--label-parsing', page);
      await waitForElementByTestId('ti-parsing-status--label-errors', page);
    });

    then('application should render errors in provided input', async () => {
      const errorListElement = await getElementByTestId('ti-parsing-status-errors--errors-list-element-0', page);
      expect(errorListElement).not.toBeUndefined();
    });
  });

  test('mark lines containing errors with red background', ({ given, when, and, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides invalid input', async () => {
      await page.type('#code-textarea--input', 'ma tch session for example');
    });

    and('the input is parsed', async () => {
      await waitForElementByTestId('ti-parsing-status--label-parsing', page);
      await waitForElementByTestId('ti-parsing-status--label-errors', page);
    });

    then('should render lines which contains errors with red background', async () => {
      const elementHandle = await page.$('[data-testid="ti-higlights-code-line-error"]');
      expect(elementHandle).not.toBeNull();
    });
  });

  test('render no errors message on valid input', ({ given, when, and, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides valid input', async () => {
      await page.type('#code-textarea--input', 'match (t)-[:L]->(d)');
    });

    and('the input is parsed', async () => {
      await waitForElementByTestId('ti-parsing-status--label-parsing', page);
      await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
    });

    then('application should render success label', async () => {
      const noErrorsElement = await getElementByTestId('ti-parsing-status--label-no-errors', page);
      expect(noErrorsElement).not.toBeUndefined();
    });
  });
});
