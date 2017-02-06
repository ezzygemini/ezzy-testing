const Jasmine = require('jasmine');

module.exports = (type, config) => new Promise((resolve, reject) => {

  const jasmine = new Jasmine();

  if (typeof config === 'string') {
    type += `  (test/${config}/*.js)`;
    config = {
      'spec_dir': `test/${config}`,
      'spec_files': ['*.js', '**/*.js']
    };
  }

  jasmine.loadConfig(Object.assign({
    'spec_dir': 'test',
    'spec_files': [
      '**/*[tT]est.js'
    ]
  }, config));

  jasmine.onComplete(passed => passed ? resolve(passed) : reject(passed));

  console.log(`Running: ${type}`);

  jasmine.execute();

});
