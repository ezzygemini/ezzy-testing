module.exports = require('./protractor')('e2e')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
