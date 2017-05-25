module.exports = require('./core')('functional testing', 'functional')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
