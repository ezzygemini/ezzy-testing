module.exports = require('./core')('sanity testing', 'sanity')
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
