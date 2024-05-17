const AxeBuilder = require('@axe-core/webdriverio').default;
const { get } = require('axios');
const { createHtmlReport } = require('axe-html-reporter');

// URL of the sitemap file
const sitemapUrl = 'https://abstracta.us/sitemap.xml';

// Set to analyze the entire site or only a subset
const fullScan = false;

describe('Accessibility Test', () => {
  
  async function fetchSitemapUrls() {

    // Extract the URLs from the sitemap
    const response = await get(sitemapUrl);
    const urls = response.data.split('<loc>').slice(1).map(line => line.split('</loc>')[0]);

    // Returning either all URLs on the sitemap or a subset based on the value of fullScan
    return fullScan ? urls : urls.slice(1, 2);
  
  }

  it('should get the accessibility results from the specified pages', async () => {

    const pageUrls = await fetchSitemapUrls();

    for (const url of pageUrls) {

      // Navigate to the current URL
      await browser.url(url);

      // Wait for the page to load completely
      await browser.waitUntil(async () => (await browser.execute(() => document.readyState)) === 'complete', { timeout: 10000, timeoutMsg: 'Page did not load within 10 seconds' });

      // Analyze the current page using axe-core
      const axeBuilder = new AxeBuilder({ client: browser });
      const accessibilityResult = await axeBuilder.analyze();

      // Print the results for the current URL to the terminal
      console.log('Accessibility Results for', url);
      console.log(JSON.stringify(accessibilityResult, null, 2));

      // Generate an HTML report for the results of the current URL
      createHtmlReport({
        results: accessibilityResult,
        options: { reportFileName: `${url.split('/').pop()}-axe-report.html`},
      });
    }

  });
});
