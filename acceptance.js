module.exports = require('./core')('acceptance testing', 'acceptance')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
