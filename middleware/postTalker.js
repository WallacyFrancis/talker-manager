const fs = require('fs');

const {
  tokenEmpty,
  tokenIvalid,
  nameEmpty,
  nameInvalid,
  ageEmpty,
  ageInvalid,
  talkEmpty,
  talkWatchedInvalid,
  talkRateInvalid,
} = require('./resObjErrors');

const HTTP_OK_STATUS = 201;
const HTTP_ERR_UNAUTHORIZED = 400;
const HTTP_ERR_REQUEST = 401;

const talkerJson = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

function createTalker(name, age, talk) {
  const talker = {
    id: talkerJson.length + 1,
    name,
    age,
    talk,
  };
  return talker;
}

// regex date: https://www.regextester.com/99555
function validDate(date) {
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return regexDate.test(date);
}

function validAuthorization(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  console.log(req.headers.token);
  if (!authorization) return res.status(HTTP_ERR_REQUEST).json(tokenEmpty);
  if (authorization.length !== 16) return res.status(HTTP_ERR_REQUEST).json(tokenIvalid);
  next();
}

function verifyName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(HTTP_ERR_UNAUTHORIZED).json(nameEmpty);
  if (name.length < 3) return res.status(HTTP_ERR_UNAUTHORIZED).json(nameInvalid);
  next();
}

function verifyAge(req, res, next) {
  const { age } = req.body;
  if (!age) return res.status(HTTP_ERR_UNAUTHORIZED).json(ageEmpty);
  if (age < Number(18)) return res.status(HTTP_ERR_UNAUTHORIZED).json(ageInvalid);
  next();
}

function verifyTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(HTTP_ERR_UNAUTHORIZED).json(talkEmpty);
  }
  next();
}

function verifyTalkWatched(req, res, next) {
  const { talk } = req.body;
  if (!validDate(talk.watchedAt)) {
    return res.status(HTTP_ERR_UNAUTHORIZED).json(talkWatchedInvalid);
  }
  next();
}

function verifyTalkRate(req, res, next) {
  const { talk } = req.body;
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_ERR_UNAUTHORIZED).json(talkRateInvalid);
  }
  next();
}

function postTalk(req, res) {
  const { name, age, talk } = req.body;
  const newTalker = createTalker(name, age, talk);
  talkerJson.push(newTalker);
  console.log(talkerJson);
  fs.writeFileSync('./talker.json', JSON.stringify(talkerJson));
  res.status(HTTP_OK_STATUS).json(newTalker);
}

module.exports = {
  validAuthorization,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkWatched,
  verifyTalkRate,
  postTalk,
};
