module.exports = require('./core')('smoke testing', 'smoke')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
