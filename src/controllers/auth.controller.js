// const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const bcrypt = require("bcrypt");
// const profileModels = require("../models/profile.model");
// const env = require("../configs/environment");

// const login = async (req, res) => {
//   try {
//     // ambil email dan password dari body
//     const { body } = req;
//     // verifikasi ke db
//     const result = await authModels.userVerification(body);
//     // jika valid, maka buatkan jwt token
//     if (result.rows.length < 1)
//       return res.status(401).json({
//         msg: "Email/Password Salah",
//       });
//     const { id, role_id, pass } = result.rows[0];
//     // compare password
//     const isPasswordValid = await bcrypt.compare(body.password, pass);
//     if (!isPasswordValid)
//       return res.status(401).json({
//         msg: "Email/Password Salah",
//       });
//     const payload = {
//       id,
//       role_id,
//     };
//     const jwtOptions = {
//       expiresIn: "30m",
//     };
//     // buat token
//     jwt.sign(payload, env.jwtSecret, jwtOptions, async (err, token) => {
//       if (err) throw err;
//       await authModels.createToken(token, body);
//       res.status(200).json({
//         msg: "Selamat Datang",
//         token,
//         id,
//         image,
//       });
//     });
//   } catch (error) {
//     // jika tidak, maka error handling
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// };

const register = async (req, res) => {
  try {
    const { body } = req;
    const pass = body.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const emailFromDb = await authModels.getEmail(body);
    if (emailFromDb.rows.length === 1) {
      res.status(400).json({
        msg: "Email already exists",
      });
      return;
    }
    const result = await authModels.register(body, hashedPassword);
    res.status(201).json({
      data: result.rows,
      msg: "Create Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  // login,
  register
}