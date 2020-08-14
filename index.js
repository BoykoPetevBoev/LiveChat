const config = require('./config/config');
const express = require('express');
const app = express();

require('./config/database')();
require('./config/express')(app);
require('./routes')(app);

app.listen(config.port, console.log(`Server started on port: ${config.port}`));

