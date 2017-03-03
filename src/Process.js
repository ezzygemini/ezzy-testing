const spawn = require('child_process').spawn;
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
    this._process = null;
    this._cwd = cwd;
    this._timeout = timeout;
    this._running = false;
  }

  /**
   * Executes the command.
   * @returns {Promise}
   */
  exec() {
    console.log('Executing:', this._cwd, this._command);
    return new Promise((resolve, reject) => {
      this._running = true;
      this._process = exec(this._command, {
        cwd: this._cwd,
        timeout: this._timeout
      }, (e, stdout, stderr) => {
        this._running = false;
        if (stderr) {
          return reject(stderr);
        } else if (stdout) {
          return resolve(stdout);
        } else if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  /**
   * Kills the running process.
   */
  kill() {
    if (this._process) {
      if (this._running) {
        try {
          killProcess(this._process.pid);
        } catch (e) {
        }
        this._running = false;
      }
      this._process = null;
    }
  }

}

module.exports = Process;
