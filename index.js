require('child_process').exec(
  'node ' +
  './node_modules/istanbul/lib/cli.js' +
  ' cover ' +
  './node_modules/testing/all.js',
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
