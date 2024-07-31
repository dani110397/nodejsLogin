const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../db/db');

const User = {
  create: async function(username, password, callback) {
    try {
      const pool = await poolPromise();
      let hashedPassword = await bcrypt.hash(password, 10);
      await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, hashedPassword)
        .query('INSERT INTO users (username, password) VALUES (@username, @password)');
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  findByUsername: async function(username, callback) {
    try {
      const pool = await poolPromise();
      let result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM users WHERE username = @username');
      callback(null, result.recordset[0]);
    } catch (err) {
      callback(err);
    }
  }
};

module.exports = User;
