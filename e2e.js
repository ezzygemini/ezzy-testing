module.exports = require('./core')('end to end', 'e2e')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
