process.env.TESTING_TYPE = 'all';

module.exports = [
  'unit',
  'integration',
  'functional',
  'system',
  'e2e',
  'sanity',
  'smoke',
  'regression',
  'acceptance',
  'load',
  'stress',
  'performance',
  'usability',
  'install',
  'uninstall',
  'recovery',
  'security',
  'compatibility',
  'alpha',
  'beta',
  'api',
  'ab',
  'custom'
].reduce((promise, suite) =>
  promise.then(() => require('./' + suite)), Promise.resolve())
  .then(
    () => console.log('\nTesting Passed'),
    () => console.error('\nTest failed')
  )
  // Process has to exit for coverage to take over.
  .then((result) => process.exit(0));
