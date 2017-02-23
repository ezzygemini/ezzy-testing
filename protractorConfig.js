const {protractor} = require('../../package.json');
const {webdriverConfig} = protractor || {};

exports.config = Object.assign({
  seleniumServerJar: '../../node_modules/protractor/' +
  'node_modules/webdriver-manager/' +
  'selenium/selenium-server-standalone-3.1.0.jar',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../../test/e2e/*.js'],
  baseUrl: 'http://localhost:' + (protractor.port || 9000) + '/',
  framework: 'jasmine',
  jasmineNodeOpts: {defaultTimeoutInterval: 30000},
  capabilities: {browserName: 'chrome'}
}, webdriverConfig);
