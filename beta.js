module.exports = require('./core')('beta testing', 'beta')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
