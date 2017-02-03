/**
 * The promise that all tests will be performed.
 * @type {Promise.<void>}
 */
const promise = Promise.all([
  require('./unit'),
  require('./integration')
])
  .then(
    () => console.log('Testing Passed'),
    () => console.error('Test failed')
  )
  .then(() => process.exit(0));

module.exports = promise;