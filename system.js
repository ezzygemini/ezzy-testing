module.exports = require('./core')('system testing', 'system')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
