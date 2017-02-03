const core = require('./core');

/**
 * The promise that the tests will run.
 * @type {Promise.<void>}
 */
const promise = require('./core')('unit testing', {
  spec_dir: 'src',
  spec_files: [
    '**/*[tT]est.js'
  ]
});

module.exports = promise;
