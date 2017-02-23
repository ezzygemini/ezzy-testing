const exec = require('child_process').exec;
const path = require('path');

const log = (e, stdout, stderr) => {
  if(e){
    console.error(e);
  }
  if(stdout){
    console.log(stdout);
  }
  if(stderr){
    console.log(stderr);
  }
};

exec('npm install -g protractor && webdriver-manager update', (...args) => {
  log.apply(this, args);
  exec('webdriver-manager start', log);
  exec('protractor ' + path.normalize(__dirname + '/protractorConfig.js'), log);
});
