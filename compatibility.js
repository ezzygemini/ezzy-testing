module.exports = require('./core')('compatibility testing', 'compatibility')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
