const path = require('path');

require('child_process').exec(
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
    }
  });
