require('./unit')
  .then(() => require('./integration'))
  .catch(() => console.error('Test failed'));
