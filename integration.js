require('./core')('integration testing', {
  spec_dir: 'src',
  spec_files: [
    '**/*[iI]nteg.js'
  ]
});
