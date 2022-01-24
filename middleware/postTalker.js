const fs = require('fs');

const {
  talkEmpty,
  talkWatchedInvalid,
  talkRateInvalid,
} = require('./resObjErrors');

const HTTP_OK_STATUS = 201;
const HTTP_ERR_UNAUTHORIZED = 400;

function createTalker(name, age, talk) {
  const talkerJson = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talker = {
    id: talkerJson.length + 1,
    name,
    age,
    talk,
  };
  talkerJson.push(talker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkerJson));
  return talker;
}

// regex date: https://www.regextester.com/99555
function validDate(date) {
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return regexDate.test(date);
}

function verifyTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    console.log(talk);
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
  res.status(HTTP_OK_STATUS).json(newTalker);
}

module.exports = {
  verifyTalk,
  verifyTalkWatched,
  verifyTalkRate,
  postTalk,
};
