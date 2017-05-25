module.exports = require('./core')('load testing', 'load')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
