const db = require("../configs/supabase");

const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select id, email, image, display_name, address, phone, gender, store_name, store_desc, role_id from users where id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateUsers = (client, req, fileLink) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE users SET ";
    let values = [];
    let i = 1;
    const body = req.body;
    if(body.password) {
      delete body.password;
    }
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }
    if (req.file) {
      sqlQuery += `image = '${fileLink}', `;
    }

    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(req.authInfo.id);
    console.log(sqlQuery);
    client.query(sqlQuery, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getProfile,
  updateUsers,
};
