import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';
import { environment } from './helpers/environment';
import { clearEditor } from './helpers/commons';
import { getClipboardValue, overrideClipboardPermissions, waitForClipboardValueToChange } from './helpers/clipboard';

const feature = loadFeature('./e2e/feature/share-code.feature');

const codeExample =
  'CREATE GRAPH TYPE IF NOT EXISTS example_graph_type\n' +
  'AS {\n' +
  '(Person :Person { "lastname" STRING, "firstname" STRING, "joined" DATE}),\n' +
  '(City :City { "name" STRING, "state" STRING, "country" STRING}),\n' +
  '(Pet :Pet { "name" STRING, "type" STRING}),\n' +
  '(Person)-[LivesIn :LIVES_IN { "since" DATE }]->(City),\n' +
  '(Person)-[Knows :KNOWS]->(Person)\n' +
  '}';

const codeExampleModified =
  'CREATE GRAPH TYPE IF NOT EXISTS example_graph_type\n' +
  'AS {\n' +
  '(Person :Person { "lastname" STRING, "firstname" STRING, "joined" DATE}),\n' +
  '(City :City { "name" STRING, "state" STRING, "country" STRING}),\n' +
  '(Pet :Pet { "name" STRING, "type" STRING}),\n' +
  '(Person)-[LivesIn :IN { "since" DATE }]->(City),\n' +
  '(Person)-[Knows :KNOWS]->(Person)\n' +
  '}';

defineFeature(feature, (test) => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await overrideClipboardPermissions(browser);
  });

  afterEach(async () => {
    await browser.close();
  });

  test('clicking share button should copy link', ({ given, when, and, then }) => {
    let previousClipboardValue;

    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides valid large input', async () => {
      await page.type('#code-textarea--input', codeExample);
    });

    and('the previous clipboard value is known', async () => {
      previousClipboardValue = await getClipboardValue(browser, page);
    });

    and('the user clicks share button', async () => {
      await page.click('[data-testid="ti-share-button"]');
      await waitForClipboardValueToChange(browser, page);
    });

    then('the link should be copied to clipboard', async () => {
      const linkFromClipboard = await getClipboardValue(browser, page);
      expect(linkFromClipboard).not.toBe(previousClipboardValue);
    });
  });

  test('generated link should proceed to provided code', ({ given, when, and, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides valid large input', async () => {
      await page.type('#code-textarea--input', codeExample);
    });

    and('the user clicks share button', async () => {
      await page.click('[data-testid="ti-share-button"]');
      await waitForClipboardValueToChange(browser, page);
    });

    and('the user moves to link in clipboard', async () => {
      const linkFromClipboard = await getClipboardValue(browser, page);
      await page.goto(linkFromClipboard);
    });

    then('provided code by the user should be automatically provided to the editor', async () => {
      const valueInEditor = await page.$eval('#code-textarea--input', (params) => params.textContent);
      expect(valueInEditor).toBe(codeExample);
    });
  });

  test('sharing code with link should work on already shared code link', ({ given, when, and, then }) => {
    given('the user is on the application page', async () => {
      await page.goto(environment.websiteUrl);
    });

    when("the editor's empty", async () => {
      await clearEditor(page);
    });

    and('the user provides valid large input', async () => {
      await page.type('#code-textarea--input', codeExample);
    });

    and('the user clicks share button', async () => {
      await page.click('[data-testid="ti-share-button"]');
      await waitForClipboardValueToChange(browser, page);
    });

    and('the user moves to link in clipboard', async () => {
      const linkFromClipboard = await getClipboardValue(browser, page);
      await page.goto(linkFromClipboard);
    });

    and('provided input by user should be in the editor', async () => {
      const valueInEditor = await page.$eval('#code-textarea--input', (params) => params.textContent);
      expect(valueInEditor).toBe(codeExample);
    });

    and('the user changes the editor value', async () => {
      await clearEditor(page);
      await page.type('#code-textarea--input', codeExampleModified);
    });

    and('the user clicks share button', async () => {
      await page.click('[data-testid="ti-share-button"]');
      await waitForClipboardValueToChange(browser, page);
    });

    and('the user moves to link in clipboard', async () => {
      const linkFromClipboard = await getClipboardValue(browser, page);
      await page.goto(linkFromClipboard);
    });

    then('provided code by the user should be automatically provided to the editor', async () => {
      const valueInEditor = await page.$eval('#code-textarea--input', (params) => params.textContent);
      expect(valueInEditor).not.toBe(codeExample);
      expect(valueInEditor).toBe(codeExampleModified);
    });
  });
});
