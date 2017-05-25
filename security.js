module.exports = require('./core')('security testing', 'security')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
