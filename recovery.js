module.exports = require('./core')('recovery testing', 'recovery')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
