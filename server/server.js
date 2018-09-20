const express = require('express');

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.listen(process.env.PORT);
// , () => console.log(`*** App listening on port ${port}! ***`));
