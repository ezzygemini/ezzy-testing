module.exports = require('./core')('performance testing', 'performance')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
