const core = require('./core');

/**
 * The promise that the tests will run.
 * @type {Promise.<void>}
 */
const promise = core('unit testing', {
  spec_files: [
    '**/*[tT]est.js'
  ]
});

module.exports = promise;
