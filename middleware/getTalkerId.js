const fs = require('fs');

const { errMessageId } = require('./resObjErrors');

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 404;

function getTalkerId(req, res) {
  const { id } = req.params;
  const result = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const findId = result.find((arr) => arr.id === Number(id));
  if (!findId) return res.status(HTTP_ERR_STATUS).json(errMessageId);
  return res.status(HTTP_OK_STATUS).json(findId);
}

module.exports = { getTalkerId };