const path = require('path');
const Process = require('./process');
const cwd = path.normalize(__dirname + '/../../../');

let pkg;
try {
  pkg = require('../../../package.json');
} catch (e) {
  pkg = {};
}

const start = (pkg.scripts ? pkg.scripts.start : '') || 'npm start';

class TestingServer {

  constructor(command) {
    this._server = new Process(start, cwd);
    this._command = new Process(command, cwd);
  }

  /**
   * Executes the command after the server starts.
   */
  exec() {
    return this._server.exec().then(
      () => this._command.exec()
        .then(
          (...args) => {
            console.log('Command Done.');
            console.log(args);
            this.killBoth();
          },
          (...args) => {
            console.error('Failed to execute the command.');
            console.error(args);
            this.killBoth();
          }
        ),
      (...args) => {
        console.error('Failed to start the server.');
        console.error(args);
        this.killBoth();
      }
    );
  }

  /**
   * Kills both processes.
   */
  killBoth(){
    this._server.kill();
    this._command.kill();
  }

}

module.exports = TestingServer;
