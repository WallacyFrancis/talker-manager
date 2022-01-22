const express = require('express');
const bodyParser = require('body-parser');

/* middelwares */
const { getTalker } = require('./middleware/getTalker');
const { getTalkerId } = require('./middleware/getTalkerId');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

/* requisitos do projeto */
app.get('/talker', getTalker);
app.get('/talker/:id', getTalkerId);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
