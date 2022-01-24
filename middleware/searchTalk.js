const fs = require('fs');

const HTTP_OK_STATUS = 200;

function searchTalk(req, res) {
  const { q } = req.query;
  const talkerJson = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const result = talkerJson.filter((arr) => arr.name.includes(q));
  console.log(q);
  return res.status(HTTP_OK_STATUS).json(result);
}

module.exports = { searchTalk };
