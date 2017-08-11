const path = require('path');
const spawn = require('child_process').spawn;
const log = d => process.stdout.write(d);
const cwd = path.normalize(__dirname + '/../../');
const argument = require('argument');
const suite = argument('suite', 'all');

let bat;

bat = spawn('/bin/sh', ['-c',
  'PORT=9001 HIDE_ARGUMENTS=true ' +
  'node ./node_modules/istanbul/lib/cli.js ' +
  `cover ./node_modules/testing/${suite}.js`
], {cwd, timeout: 900000});
bat.stdout.on('data', log);
bat.stderr.on('data', log);
bat.on('exit', code => {
  if (code !== 0) {
    return console.log(`Child exited with code ${code}`);
  }
  console.log(process.cwd());
  bat = spawn('/bin/sh', ['-c',
    'PORT=9001 HIDE_ARGUMENTS=true ' +
    'cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js'
  ], {cwd, timeout: 180000});
  bat.stdout.on('data', log);
  bat.stderr.on('data', log);
  bat.on('exit', code => console.log(`Child exited with code ${code}`));
});