const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const path = require('path');

module.exports = (type, config) => {

  jasmine.loadConfig(Object.assign({
    spec_dir: 'src',
    spec_files: [
      '**/*[tT]est.js'
    ]
  }, config));

  console.log(`Running: ${type}`);

  jasmine.execute();

};


