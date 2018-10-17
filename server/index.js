const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.API_TOKEN)

app.use(express.static('dist'));

app.get('/', (req, res) => res.send());

app.listen(port, () => console.log(`*** App listening on port ${port}! ***`));
