module.exports = require('./core')('alpha testing', 'alpha')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
