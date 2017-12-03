const app = require('../app');
const config = require('config');

const port = config.get('port');

app.listen(port, () => console.log(`listen on port ${port}`));
