const path = require('path');
const Process = require('./Process');
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
    this._server.exec().catch(() => {});
    return new Promise(resolve => {
      setTimeout(() => {
        this._command.exec().then(
          out => {
            console.log(out);
            console.log('Command Done.');
            resolve(out);
            this.killBoth();
          },
          e => {
            console.error('Failed to execute the command.');
            console.error(e);
            resolve(e);
            this.killBoth();
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
      process.exit(0);
    }catch(e){}
  }

}

module.exports = TestingServer;
