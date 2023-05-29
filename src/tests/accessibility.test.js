const { remote } = require('webdriverio');
const AxeBuilder = require('@axe-core/webdriverio').default;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createHtmlReport } = require('axe-html-reporter');

describe('Accessibility Test', () => {
  const sitemapUrl = 'https://abstracta.us/sitemap.xml';

  async function fetchSitemapUrls() {
    try {
      const response = await axios.get(sitemapUrl);
      const allUrls = response.data.match(/<loc>(.*?)<\/loc>/g).map((loc) => loc.replace('<loc>', '').replace('</loc>', ''));
  
      // Filter out URLs starting with "/blog/"
      const filteredUrls = allUrls.filter((url) => !url.includes('/blog/'));
  
      return filteredUrls;
    } catch (err) {
      console.error('Error fetching sitemap:', err);
      return [];
    }
  }

  it('should get the accessibility results from multiple pages', async () => {
    const pageUrls = await fetchSitemapUrls();
    const axeBuilder = new AxeBuilder({ client: browser });

    try {
      for (const url of pageUrls) {
        await browser.url(url);

        const accessibilityResult = await axeBuilder.analyze();

        console.log('Accessibility Results for', url);
        console.log(JSON.stringify(accessibilityResult, null, 2));

        const jsonFilePath = path.resolve(__dirname, '../output/accessibility-results.json');
        fs.writeFileSync(jsonFilePath, JSON.stringify(accessibilityResult, null, 2));

        const reportHTML = createHtmlReport({
          results: accessibilityResult,
          options: {
            projectKey: 'Abstracta',
            doNotCreateReportFile: true,
          },
        });

        const pathPart = new URL(url).pathname;
        const newPath = pathPart.replace(/[^a-z0-9]/gi, '_').replace(/_/g, '-');
        const htmlFilePath = path.resolve(__dirname, '../output', `accessibility-results-${newPath}.html`);
        fs.writeFileSync(htmlFilePath, reportHTML);
      }
    } catch (err) {
      console.error(err);
    } finally {
      await browser.deleteSession();
    }
  });
});