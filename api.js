module.exports = require('./core')('api testing', 'api');

// module.exports = require('./protractor')('api');
//
// const exec = require('child_process').exec;
// const path = require('path');
//
// module.exports = new Promise((resolve, reject) => {
//   exec('node ./index', {
//     cwd: path.normalize(__dirname + '/test')
//   }, (e, stdout, stderr) => {
//     if (e) {
//       console.error(e);
//       reject(e);
//     }else if (stderr) {
//       console.error(stderr);
//       reject(stderr);
//     } else {
//       console.log(stdout);
//       resolve(stdout);
//     }
//   });
// });
