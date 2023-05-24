const { remote } = require('webdriverio');
const AxeBuilder = require('@axe-core/webdriverio').default;
const path = require('path');
const fs = require('fs');
const { createHtmlReport } = require('axe-html-reporter');

describe('Accessibility Test', () => {
  it('should get the accessibility results from a page', async () => {
    // Initialize WebDriverIO and AxeBuilder
    //const builder = new AxeBuilder({ client: browser }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    const builder = new AxeBuilder({ client: browser });

    await browser.url('https://abstracta.us/');

    // Analyze accessibility
    const result = await builder.analyze();

    console.log('Accessibility Results:');
    console.log(JSON.stringify(result, null, 2));

    // Export results to a JSON file
    const jsonFilePath = path.resolve(__dirname, '../output/accessibility-results.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2));

    // Generate HTML report
    const reportHTML = createHtmlReport({
      results: result,
      options: {
        projectKey: 'Abstracta',
        doNotCreateReportFile: true,
      },
    });

    console.log('reportHTML will have full content of HTML file.');
    // Save report to file
    const htmlFilePath = path.resolve(__dirname, '../output/accessibility-results.html');
    fs.writeFileSync(htmlFilePath, reportHTML);

    await browser.deleteSession();
  });
});