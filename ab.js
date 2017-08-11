module.exports = require('./core')('ab testing', 'ab')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
