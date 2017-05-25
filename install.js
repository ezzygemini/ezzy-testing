module.exports = require('./core')('install testing', 'install')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
