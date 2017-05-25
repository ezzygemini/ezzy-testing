process.env.TESTING_TYPE = 'all';

module.exports = [
  'unit',
  'integration',
  'functional',
  'system',
  // 'e2e',
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
  // 'api',
  'ab'
].reduce((promise, suite) =>
  promise.then(() => require('./' + suite)), Promise.resolve())
  .then(
    () => console.log('\nTesting Passed'),
    () => console.error('\nTest failed')
  )
  .then(() => process.exit(0));
