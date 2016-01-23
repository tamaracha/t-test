// require all `test/components/**/index.js`
const testsContext = require.context('./src/', true);

testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
require('../src/');
