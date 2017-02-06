const Jasmine = require('jasmine');

/**
 * Core function that will execute a set of jasmine sets.
 * @param {string} type The type of testing to do.
 * @param {object} config The object configuration for the jasmine spec.
 * @returns {Promise.<void>}
 */
const promiseFn = (type, config) => {
  const jasmine = new Jasmine();

  if (typeof config === 'string') {
    type += `  (test/${config}/*.js)`;
    config = {
      'spec_dir': `test/${config}`,
      'spec_files': ['*.js', '**/*.js']
    };
  }

  jasmine.loadConfig(Object.assign({
    'spec_dir': 'src',
    'spec_files': []
  }, config));

  console.log(`Running: ${type}`);

  return Promise.resolve(jasmine.execute());
};

module.exports = promiseFn;
