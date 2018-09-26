const core = require('./core');
module.exports = core('unit testing (src/*Test.js)', {
  'spec_dir': 'src',
  'spec_files': [
    '*Test.js',
    '*Unit.js',
    '**/*Test.js',
    '**/*Unit.js'
  ]
}).finally(() => core('unit testing (test/unit/*.js)', {
  'spec_dir': 'test/unit',
  'spec_files': [
    '*.js',
    '**/*.js'
  ]
})).then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
