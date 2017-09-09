module.exports = require('./core')('e2e', 'end to end')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
