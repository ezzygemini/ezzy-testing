const Jasmine = require('jasmine');

/**
 * Core function that will execute a set of jasmine sets.
 * @param {string} type The type of testing to do.
 * @param {object} config The object configuration for the jasmine spec.
 * @returns {Promise.<void>}
 */
const promiseFn = (type, config) => new Promise((resolve, reject) => {

  const jasmine = new Jasmine();

  jasmine.loadConfig(Object.assign({
    spec_dir: 'src',
    spec_files: [
      '**/*[tT]est.js'
    ]
  }, config));

  jasmine.onComplete(passed => passed ? resolve(passed) : reject(passed));

  console.log(`Running: ${type}`);

  jasmine.execute();

});

module.exports = promiseFn;
