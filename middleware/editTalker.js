const fs = require('fs');

const HTTP_OK_STATUS = 200;

function putTalker(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerJson = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkIndex = talkerJson.findIndex((arr) => arr.id === Number(id));
  talkerJson[talkIndex] = { ...talkerJson[talkIndex], name, age, talk };
  fs.writeFileSync('./talker.json', JSON.stringify(talkerJson));
  res.status(HTTP_OK_STATUS).send(talkerJson[talkIndex]);
}

module.exports = {
  putTalker,
};
