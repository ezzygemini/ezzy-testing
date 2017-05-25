module.exports = require('./core')('integration testing', 'integration')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
