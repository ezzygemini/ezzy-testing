const core = require('./core');

/**
 * The promise that the tests will run.
 * @type {Promise.<void>}
 */
const promise = core('integration testing', {
  spec_dir: 'src',
  spec_files: [
    '**/*[iI]nteg.js'
  ]
});

module.exports = promise;
