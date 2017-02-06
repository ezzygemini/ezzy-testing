const core = require('./core');
module.exports = core('unit testing (src/*Test.js)', {
  'spec_dir': 'src',
  'spec_files': [
    '*Test.js',
    '*Unit.js',
    '**/*Test.js',
    '**/*Unit.js'
  ]
}).then(() => core('unit testing (test/unit/*.js)', {
  'spec_dir': 'test/unit',
  'spec_files': [
    '*.js',
    '**/*.js'
  ]
}));
