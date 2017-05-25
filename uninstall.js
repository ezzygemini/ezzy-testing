module.exports = require('./core')('uninstall testing', 'uninstall')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
