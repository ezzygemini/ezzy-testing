require('child_process')
  .exec(
    'node ' +
    './node_modules/istanbul/lib/cli.js' +
    ' cover ' +
    './node_modules/testing/all.js',
    (e, out) => {
      if (e) {
        throw e;
      }
      console.log(out);
    });
