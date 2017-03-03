const argument = require('argument');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
jasmine.loadConfig({
  'spec_dir': argument('SPEC_FOLDER', 'test/folderNotDefined'),
  'spec_files': [argument('SPEC_FILES', '**/*Test.js')]
});
jasmine.execute();
