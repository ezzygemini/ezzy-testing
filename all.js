require('./unit')
  .then(() => require('./integration'))
  .then(
    () => console.log('Testing Passed'),
    () => console.error('Test failed')
  )
  .then(() => process.exit(0));
