const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig(Object.assign({
  'spec_dir': '.',
  'spec_files': ['**/*Test.js']
}));

let logs = '';

jasmine.configureDefaultReporter({
  print: log => {
    logs += log;
  },
  showColors: true
});

jasmine.onComplete(passed =>
  passed ? console.log(logs) : console.error(logs));

jasmine.execute();
