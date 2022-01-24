const {
  tokenEmpty,
  tokenIvalid,
  nameEmpty,
  nameInvalid,
  ageEmpty,
  ageInvalid,
} = require('./resObjErrors');

const HTTP_ERR_UNAUTHORIZED = 400;
const HTTP_ERR_REQUEST = 401;

function validAuthorization(req, res, next) {
  const { authorization } = req.headers;
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

module.exports = {
  validAuthorization,
  verifyName,
  verifyAge,
};
