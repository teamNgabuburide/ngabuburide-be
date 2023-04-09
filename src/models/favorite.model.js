const db = require("../configs/supabase");

const getFavorite = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT f.user_id, pi.image, f.prod_id, p.prod_name, p.stock, p.price 
    FROM favorite f 
    JOIN users u ON u.id = $1
    JOIN products p ON p.id = f.prod_id 
    JOIN (
      SELECT prod_id, MIN(image) AS image
      FROM prod_images
      GROUP BY prod_id
    ) pi ON p.id = pi.prod_id;`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertFavorite = (id, prod_id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into favorite (user_id, prod_id) values ($1, $2) RETURNING *`;

    db.query(sqlQuery, [id, prod_id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const cekFavorite = (id) => {
  return new Promise((resolve, reject) => {
  const sqlQuery = `select prod_id from favorite where user_id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  })
};

const deleteFavorite = (id, params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from favorite where user_id = $1 and prod_id = $2 RETURNING *`;
    // const values = [params.id];
    db.query(sqlQuery, [id, params.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getFavorite,
  insertFavorite,
  cekFavorite,
  deleteFavorite
};
