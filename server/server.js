const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.static('dist'));

app.listen(port, () => console.log(`*** App listening on port ${port}! ***`));
