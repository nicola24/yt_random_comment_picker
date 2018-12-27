const express = require('express');
const bodyParser = require('body-parser');

const router = require('./middlewares/router');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static('dist'));

app.use('/api', router);

app.listen(port, () => logger.appStarted(port));
