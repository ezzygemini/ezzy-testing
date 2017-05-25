const path = require('path');
const exec = require('child_process').exec;

process.env.NODE_LOG_LEVEL = 'debug';

exec(
  'node ' +
  './node_modules/istanbul/lib/cli.js' +
  ' cover ' +
  './node_modules/testing/all.js',
  {
    cwd: path.normalize(__dirname + '/../../'),
    timeout: 900000 // 15 minute timeout
  },
  (e, stdout, stderr) => {
    if (e) {
      console.error(e);
    }
    if (stderr) {
      console.error(stderr);
    }
    if (stdout) {
      console.log(stdout);

      exec('cat ./coverage/lcov.info | ' +
        './node_modules/coveralls/bin/coveralls.js && ' +
        'rm -rf ./coverage', (e, stdout, stderr) => {
        if (e) {
          console.log(e);
          // Seems to be a windows machine
          console.log('This seems to be a non-unix machine.' +
            ' Coverage will not be uploaded to coveralls.');
        }
        if (stderr) {
          console.log(stderr);
        }
        if (stdout) {
          console.log(stdout);
        }
      });
    }
  });
