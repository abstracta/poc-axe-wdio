# PoC Axe + WDIO

This project is an automated testing project that utilizes WebdriverIO (WDIO) and Axe to test the accessibility of a web page. The purpose of this framework is to analyze the accessibility of a web page and output the results to a JSON file and an HTML report.

## Project structure

### /output
- accessibility-results.json 
- accessibility-results.html 

### /pages
- accessibility.test.js: This file contains the test code that analyzes the accessibility of a web page using Axe.

### /tests
- search.js: 

## How to run
To get started with this project, follow the steps below:

1. Clone the repository to your local machine
2. Install the dependencies by running   
```
npm install
```
3. Run the test suite by running  
 ```
 npm run wdio
 ```
4.  After running the test, you can find the accessibility results in a JSON file and an HTML report inside the /output directory.

## Axe Report
This project uses Axe to generate an accessibility report that provides information about the accessibility of the web page. After running the tests, the report can be found in the /output directory in both JSON and HTML formats.

Note: The AxeBuilder object in the ```accessibility.test.js``` file can be configured to include or exclude specific accessibility tests by using the ```.withTags()``` method.

### Tags

Axe uses tags to categorize accessibility rules based on their severity and relevance. Some of the available tags are:

- wcag2a: WCAG 2.0 Level A
- wcag2aa: WCAG 2.0 Level AA
- wcag2aaa: WCAG 2.0 Level AAA
- wcag21a: WCAG 2.1 Level A
- wcag21aa: WCAG 2.1 Level AA
- wcag22aa: WCAG 2.2 Level AA
- best-practice: Common accessibility best practices

You can find more tags on the [Axe API documentation](https://www.deque.com/axe/core-documentation/api-documentation).
