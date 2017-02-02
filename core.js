const Jasmine = require('jasmine');

module.exports = (type, config) => {

  const jasmine = new Jasmine();

  jasmine.loadConfig(Object.assign({
    spec_dir: 'src',
    spec_files: [
      '**/*[tT]est.js'
    ]
  }, config));

  console.log(`Running: ${type}`);

  jasmine.execute();

};


