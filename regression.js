module.exports = require('./core')('regression testing', 'regression')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
