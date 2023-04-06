const db = require("../configs/supabase");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sql = "SELECT id, role_id, password, display_name, phone FROM users WHERE email=$1";
    db.query(sql, [body.email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createToken = (token) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sqlQuery = `insert into tokens (token) values ($1)`;
    db.query(sqlQuery, [token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmail = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select email from users where email = $1";
    db.query(sqlQuery, [body.email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const createBlackList = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update tokens set black_list = $1 where token = $2`;
    db.query(sqlQuery, [token, token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const register = (data, hashedPassword) => {
  // console.log(data);
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into users (email, password, phone, role_id) values ($1, $2, $3, $4) RETURNING email, phone`;
    // parameterized query
    const values = [data.email, hashedPassword, data.phone, data.role_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const createOtp = (email, otp) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "UPDATE users set otp = $1 WHERE email = $2 RETURNING otp";
    const values = [otp, email];
    db.query(sqlQuery, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getOtp = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select otp from users where email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getBlackList = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT black_list FROM tokens WHERE token = $1`;
    db.query(sqlQuery, [token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const forgot = (email, password) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE users set password = $1 where email = $2`;
    db.query(sqlQuery, [password, email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  createToken,
  getEmail,
  getBlackList,
  register,
  createBlackList,
  getOtp,
  createOtp,
  forgot
}