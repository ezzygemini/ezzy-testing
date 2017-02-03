const Jasmine = require('jasmine');

/**
 * Core function that will execute a set of jasmine sets.
 * @param {string} type The type of testing to do.
 * @param {object} config The object configuration for the jasmine spec.
 * @returns {Promise.<void>}
 */
const promiseFn = (type, config) => {

  const jasmine = new Jasmine();

  config = Object.assign({
    spec_dir: 'src',
    spec_files: []
  }, config);

  jasmine.loadConfig(config);

  console.log(`Running: ${type}`);
  return Promise.resolve(jasmine.execute());
};

module.exports = promiseFn;
