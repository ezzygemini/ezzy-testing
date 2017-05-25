module.exports = require('./core')('stress testing', 'stress')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
