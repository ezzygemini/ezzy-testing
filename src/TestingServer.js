const path = require('path');
const Process = require('./process');
const cwd = path.normalize(__dirname + '/../../../');

class TestingServer {

  constructor(command) {
    this._server = new Process('npm start', cwd);
    this._command = new Process(command, cwd);
  }

  /**
   * Executes the command after the server starts.
   */
  exec(){
    this._server.exec(() => {}, () => {}).catch(() => {});
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._command.exec().then(
          out => {
            console.log(out);
            console.log('Command Done.');
            this._server.kill();
            resolve(out);
          },
          e => {
            console.error('Failed to execute the command.');
            console.error(e);
            this._server.kill();
            resolve(e);
          }
        );
      }, 6000);
    });
  }

  /**
   * Kills both processes.
   */
  killBoth(){
    try{
      this._server.kill();
      this._command.kill();
    }catch(e){}
  }

}

module.exports = TestingServer;
