const db = require('../database/dbConfig.js');

module.exports = {
  findBy,
  insert
};

function findBy(user) {
  return db('users').where(user).first();
};

function insert(user) {
  return db('users').insert(user).then(([id]) => findBy({ id }));
};