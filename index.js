const express = require('express');
const bodyParser = require('body-parser');

/* middelwares */
const { getTalker } = require('./middleware/getTalker');
const { getTalkerId } = require('./middleware/getTalkerId');
const { login } = require('./middleware/login');
const {
  validAuthorization,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkWatched,
  verifyTalkRate,
  postTalk,
} = require('./middleware/postTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

/* requisitos do projeto */
app.get('/talker', getTalker); // req1
app.get('/talker/:id', getTalkerId); // req 2
app.post('/login', login); // req 3
app.post('/talker',
  validAuthorization,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkWatched,
  verifyTalkRate,
  postTalk);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
