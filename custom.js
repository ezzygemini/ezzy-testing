const argument = require('argument');
const spec = argument(['spec', 'test_type', 'type'], 'custom');

module.exports = require('./core')(`${spec} testing`, spec)
  .then((result) => process.env.TESTING_TYPE ? result : process.exit(0));
