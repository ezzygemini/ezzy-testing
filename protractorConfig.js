const {protractor} = require('../../package.json');

exports.config = Object.assign({
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../../test/e2e/*.js']
}, protractor);
