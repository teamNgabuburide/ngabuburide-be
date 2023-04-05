const db = require("../configs/supabase");

// const userVerification = (body) => {
//   return new Promise((resolve, reject) => {
//     // verifikasi ke db
//     const sql = "SELECT id, role_id, pass FROM users WHERE email=$1";
//     db.query(sql, [body.email], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// const createToken = (token, body) => {
//   return new Promise((resolve, reject) => {
//     // verifikasi ke db
//     const sqlQuery = `update users set token = $1 where email = $2`;
//     db.query(sqlQuery, [token, body.email], (err, result) => {
//       if (err) reject(err);
//       resolve(result);
//     });
//   });
// };

const getEmail = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select email from users where email = $1";
    db.query(sqlQuery, [body.email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// const getIdUsers = () => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = "select MAX(id) from users";
//     db.query(sqlQuery, (err, result) => {
//       if (err) reject(err);
//       resolve(result);
//     });
//   });
// };

const register = (data, hashedPassword) => {
  // console.log(data);
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into users (email, password, phone) values ($1, $2, $3) RETURNING email, phone`;
    // parameterized query
    const values = [data.email, hashedPassword, data.phone];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  // userVerification,
  // createToken,
  getEmail,
  // getIdUsers,
  register
}