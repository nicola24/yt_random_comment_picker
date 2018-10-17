const express = require('express');

const getAllPagesComments = require('./fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/getcomments/:videoid', (req, res) => {
  const { videoid } = req.params;

  getAllPagesComments(videoid, '').then(ytData => res.send(ytData));
});

app.listen(port, () => console.log(`*** App listening on port ${port}! ***`));
