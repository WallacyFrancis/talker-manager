const crypto = require('crypto');

const { emailNull, emailEmpty, passowrdEmpty, passwordInvalid } = require('./resObjErrors');

// regex: https://app.slack.com/client/TMDDFEPFU/search/search-e48f3061-7e25-42b0-8b60-e0862036e892/thread/C023YHXAEGM-1634319081.263300
// by: Gustavo Sant'Anna
const validEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
};

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 400;

// Auxiliado por Danis Espanhol
const generationToken = {
  token: crypto.randomBytes(16).toString('hex').slice(0, 16),
};

function login(req, res) {
  const { email, password } = req.body;
  if (!email) return res.status(HTTP_ERR_STATUS).json(emailNull);
  if (!validEmail(email)) return res.status(HTTP_ERR_STATUS).json(emailEmpty);
  if (!password) return res.status(HTTP_ERR_STATUS).json(passowrdEmpty);
  if (password.length < 6) return res.status(HTTP_ERR_STATUS).json(passwordInvalid);
  return res.status(HTTP_OK_STATUS).json(generationToken);
}

module.exports = { login };
