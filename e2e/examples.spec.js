import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';
import { environment } from '$e2e/helpers/environment';
import {
  clearFocusedInput,
  clickByTestId,
  getElementsByTestId,
  waitForElementByTestId,
  waitForMillis,
} from '$e2e/helpers/commons';

describe('examples feature', () => {
  const feature = loadFeature('./e2e/feature/examples.feature');

  const firstGrammarExample = `CREATE GRAPH mySocialNetwork OPEN TYPE
INSERT (:Person { "firstname": "Keith", "lastname": "Hare", 
         "joined": DATE "2022-08-23" })
       -[:LIVES_IN { "since": DATE "1980-07-15" }]->
       (:City { "name":"Granville", "state":"OH",
         "country": "USA" })
INSERT (:Pet { "name": "Winnifred", "type": "Dog" })
/*
   The following INSERT succeeds because there are
   no restrictions on the contents of the graph.
*/
MATCH (a { "firstname": "Keith" }), (d { "name": "Winnifred" })
INSERT (a)-[:HasPet]->(d)
`.trim();

  defineFeature(feature, (test) => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch({ headless: 'shell' });
      page = await browser.newPage();
    });

    afterAll(async () => {
      await browser.close();
    });

    test('the user selects an example', ({ given, when, and, then }) => {
      given('the user is on the application page', async () => {
        await page.goto(environment.websiteUrl);
      });

      given('the user moves to examples page', async () => {
        await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
        await clickByTestId('ti-examples-page-button', page);
      });

      when('the examples are loaded', async () => {
        await waitForElementByTestId('ti-examples-list', page);
      });

      and('the user clicks on first example of provided language', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        await examples[0].click();
      });

      then('the example should be moved to the editor', async () => {
        const editorValue = await page.$eval('#code-textarea--input', (element) => element.textContent);
        expect(editorValue?.trim()).toBe(firstGrammarExample);
      });
    });

    test('selecting of example should move to upper part of page', ({ given, when, and, then }) => {
      given('the user is on the application page', async () => {
        await page.goto(environment.websiteUrl);
      });

      given('the user moves to examples page', async () => {
        await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
        await clickByTestId('ti-examples-page-button', page);
      });

      when('the examples are loaded', async () => {
        await waitForElementByTestId('ti-examples-list', page);
      });

      and('the user clicks no first example of provided language', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        await examples[0].click();
      });

      and('the example is provided to the editor', async () => {
        const editorValue = await page.$eval('#code-textarea--input', (element) => element.textContent);
        expect(editorValue?.trim()).toBe(firstGrammarExample);
      });

      then('the page scroll position should be set to beginning of the page', async () => {
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBe(0);
      });
    });

    test('providing search phrase should change list of examples', ({ given, when, and, then }) => {
      let defaultCountOfExamples;

      given('the user is on the application page', async () => {
        await page.goto(environment.websiteUrl);
      });

      given('the user moves to examples page', async () => {
        await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
        await clickByTestId('ti-examples-page-button', page);
      });

      when('the examples are loaded', async () => {
        await waitForElementByTestId('ti-examples-list', page);
      });

      and('the search input is empty', async () => {
        await clickByTestId('ti-examples-search-input', page);
        await clearFocusedInput(page);
      });

      and('the default count of examples is known', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        defaultCountOfExamples = examples.length;
      });

      and('the user provides an search phrase to examples', async () => {
        await page.type('[data-testid="ti-examples-search-input"]', 'session');
        await waitForMillis(550);
      });

      then('the examples list should be altered to provide only examples that match', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        expect(examples.length).not.toBe(defaultCountOfExamples);
      });
    });

    test('removing searching phrase should reset list of examples', ({ given, when, and, then }) => {
      let defaultCountOfExamples;

      given('the user is on the application page', async () => {
        await page.goto(environment.websiteUrl);
      });

      given('the user moves to examples page', async () => {
        await waitForElementByTestId('ti-parsing-status--label-no-errors', page);
        await clickByTestId('ti-examples-page-button', page);
      });

      when('the examples are loaded', async () => {
        await waitForElementByTestId('ti-examples-list', page);
      });

      and('the search input is empty', async () => {
        await clickByTestId('ti-examples-search-input', page);
        await clearFocusedInput(page);
      });

      and('the default count of examples is known', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        defaultCountOfExamples = examples.length;
      });

      and('the user provides an search phrase to examples', async () => {
        await page.type('[data-testid="ti-examples-search-input"]', 'session');
        await waitForMillis(550);
      });

      and('the examples list is altered', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        expect(examples.length).not.toBe(defaultCountOfExamples);
      });

      and('the user removes search phrase', async () => {
        await clickByTestId('ti-examples-search-input', page);
        await clearFocusedInput(page);
        await waitForMillis(550);
      });

      then('the examples list should be at initial state before search', async () => {
        const examples = await getElementsByTestId('ti-examples-list-item', page);
        expect(examples.length).toBe(defaultCountOfExamples);
      });
    });
  });
});
