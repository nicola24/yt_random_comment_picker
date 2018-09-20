const express = require('express');

const app = express();
// const port = process.env.PORT || 3000;

const port = 3000 || process.env.PORT || 80;
const host = process.env.YOUR_HOST || '0.0.0.0';

app.use(express.static('dist'));

app.listen(port, host, () => console.log(`*** App listening on port ${port}! ***`));
