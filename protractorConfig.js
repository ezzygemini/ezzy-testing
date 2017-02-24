const protractor = require('../../package.json').protractor || {};
const webdriverConfig = protractor.webdriverConfig || {};

exports.config = Object.assign({
  seleniumServerJar: '../../node_modules/protractor/' +
  'node_modules/webdriver-manager/' +
  'selenium/selenium-server-standalone-3.1.0.jar',
  specs: [
    '../../test/e2e/*Test.js',
    '../../test/e2e/**/*Test.js'
  ],
  baseUrl: 'http://localhost:' + (protractor.port || 9005) + '/',
  framework: 'jasmine',
  jasmineNodeOpts: {defaultTimeoutInterval: 30000},
  capabilities: {browserName: 'chrome'}
}, webdriverConfig);
