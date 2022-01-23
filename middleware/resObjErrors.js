const errMessageId = {
  message: 'Pessoa palestrante não encontrada',
};
const emailNull = {
  message: 'O campo "email" é obrigatório',
};
const emailEmpty = {
  message: 'O "email" deve ter o formato "email@email.com"',
};
const passowrdEmpty = {
  message: 'O campo "password" é obrigatório',
};
const passwordInvalid = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};
const tokenEmpty = {
  message: 'Token não encontrado',
};
const tokenIvalid = {
  message: 'Token inválido',
};
const nameEmpty = {
  message: 'O campo "name" é obrigatório',
};
const nameInvalid = {
  message: 'O "name" deve ter pelo menos 3 caracteres',
};
const ageEmpty = {
  message: 'O campo "age" é obrigatório',
};
const ageInvalid = {
  message: 'A pessoa palestrante deve ser maior de idade',
};
const talkEmpty = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};
const talkWatchedInvalid = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};
const talkRateInvalid = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

module.exports = { 
  errMessageId,
  emailNull,
  emailEmpty,
  passowrdEmpty,
  passwordInvalid,
  tokenEmpty,
  tokenIvalid,
  nameEmpty,
  nameInvalid,
  ageEmpty,
  ageInvalid,
  talkEmpty,
  talkWatchedInvalid,
  talkRateInvalid,
};