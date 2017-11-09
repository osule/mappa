const express = require('express');
const app = express();
const configureRoutes = require('./routes');

configureRoutes(app);

app.listen(5000, () => console.log('Example app listening on port 5000!'));