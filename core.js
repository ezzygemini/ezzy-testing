const Jasmine = require('jasmine');

module.exports = (type, config) => new Promise((resolve, reject) => {

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
