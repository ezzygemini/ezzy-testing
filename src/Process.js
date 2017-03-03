const exec = require('child_process').exec;

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

class Process {

  constructor(command, cwd, timeout = 0) {
    this._command = command;
    this._pid = null;
    this._cwd = cwd;
    this._timeout = timeout;
  }

  /**
   * Executes the command.
   * @returns {Promise}
   */
  exec() {
    this.kill();
    return new Promise((resolve, reject) => {
      this._pid = exec(this._command, {
        cwd: this._cwd,
        timeout: this._timeout
      }, (e, stdout, stderr) => {
        log(e, stdout, stderr, this._command);
        if (e) {
          return reject(e);
        }
        if (stderr) {
          return reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

  /**
   * Kills the running process.
   */
  kill() {
    if (this._pid) {
      killProcess(this._pid.pid);
      this._pid = null;
    }
  }

}

module.exports = Process;
