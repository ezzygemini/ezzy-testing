module.exports = require('./core')('usability testing', 'usability')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
