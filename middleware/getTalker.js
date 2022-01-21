const fs = require('fs');

const HTTP_OK_STATUS = 200;

async function getTalker(_req, res) {
  const result = await JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  res.status(HTTP_OK_STATUS).send(result);
}

module.exports = { getTalker };
