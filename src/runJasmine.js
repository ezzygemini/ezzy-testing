console.log(process.argv);
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
jasmine.loadConfig(Object.assign({
  'spec_dir': argument('SPEC_FOLDER', 'test/folderNotDefined'),
  'spec_files': argument('SPEC_FILES', '**/*Test.js')
}, config));
console.log(`Running: ${type}`);
jasmine.execute();
