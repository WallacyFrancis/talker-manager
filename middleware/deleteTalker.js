const fs = require('fs');

const HTTP_OK_STATUS = 204;

function deleteTalker(req, res) {
  const { id } = req.params;
  const talkerJson = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const newJson = talkerJson.filter((arr) => arr.id !== Number(id));
  fs.writeFileSync('./talker.json', JSON.stringify(newJson));
  return res.status(HTTP_OK_STATUS).json();
}

module.exports = { deleteTalker };