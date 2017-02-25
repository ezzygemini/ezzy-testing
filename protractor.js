const exec = require('child_process').exec;
const path = require('path');
const pkg = require('../../package.json');
const scripts = pkg.scripts || {};
const protractor = pkg.protractor || {};
const skipInstall = protractor.skipInstall;
const port = protractor.port || 9005;
const cmd = protractor.cmd || scripts.start || 'npm start';
const psTree = require('ps-tree');
const enableLogging = protractor.logging;

const log = (e, stdout, stderr, addlMsg) => {
  if (addlMsg) {
    console.log(addlMsg);
  }
  if (e) {
    console.log(addlMsg, 'Error Occurred: ', typeof e);
    console.dir(e);
    console.error(e);
  }
  if (stdout) {
    console.log(addlMsg, 'STDOUT:');
    console.log(stdout);
  }
  if (stderr) {
    console.log(addlMsg, 'STDERR:');
    console.log(stderr);
  }
};

const kill = (pid, signal, callback) => {
  signal = signal || 'SIGKILL';
  callback = callback || (() => {
    });
  const killTree = true;
  if (killTree) {
    psTree(pid, (err, children) => {
      [pid].concat(children.map(p => p.PID))
        .forEach(tpid => {
          try {
            process.kill(tpid, signal);
          }
          catch (ex) {
          }
        });
      callback();
    });
  } else {
    try {
      process.kill(pid, signal);
    }
    catch (ex) {
    }
    callback();
  }
};

const killProcess = pid => {
  if (!/^win/.test(process.platform)) {
    kill(pid);
  } else {
    exec('taskkill /PID ' + pid + ' /T /F', log);
  }
};

const promiseFn = (folder = 'e2e') => new Promise((resolve, reject) => {

  const runCommands = () => {
    exec('node node_modules/protractor/bin/webdriver-manager update',
      {timeout: 120000}, (e, stdout, stderr) => {

        log(e, stdout, stderr, 'Webdriver Update Process');
        if (e) {
          return reject(e);
        }

        const command = `${cmd} --TEST_FOLDER=${folder} --PORT=${port}`;
        console.log('Command Executed for App:', command);
        const application =
          exec(command, {timeout: 1.8e+6}, (e, stdout, stderr) => {
            log(null, enableLogging ? stdout : null,
              stderr, 'Application Process');
          });
        const webdriver =
          exec('node node_modules/protractor/bin/webdriver-manager start',
            {timeout: 1.8e+6}, (e, stdout, stderr) => {

              const okMsg = 'Selenium Server is up and running';
              if (
                (e && e.Error && e.Error.indexOf(okMsg) > -1) ||
                (stderr && stderr.indexOf(okMsg) > -1)
              ) {
                return;
              }
              log(e, stdout, stderr, 'Webdriver Process');
              if (e) {
                killAll();
                return reject(e);
              }
            });
        const protractor =
          exec('node node_modules/protractor/bin/protractor ' +
            path.normalize(__dirname + '/protractorConfig.js'),
            {
              timeout: 1.8e+6,
              cwd: path.normalize(__dirname + '/../../')
            }, (e, stdout, stderr) => {
              killAll();
              log(e, stdout, stderr, 'Protractor Requested');
              if (e) {
                return reject(e);
              }
              if (stdout.indexOf('ECONNREFUSED') > -1) {
                return reject(e);
              }
              if (stderr) {
                return resolve(stderr);
              }
              resolve(stdout);
            });

        const killAll = () => {
          killProcess(application.pid);
          killProcess(webdriver.pid);
          killProcess(protractor.pid);
        };

      });
  };

  if (!skipInstall) {
    exec('npm install protractor ' +
      '&& node node_modules/protractor/bin/webdriver-manager update',
      {timeout: 20000}, (e, stdout, stderr) => {
        log(e, stdout, stderr, 'Install Process');
        if (e) {
          return reject(e);
        }
        runCommands();
      });
  } else {
    runCommands();
  }

});

module.exports = promiseFn;
