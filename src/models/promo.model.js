const db = require("../configs/supabase");

module.exports = {
  addPromo: ({ prod_id, promo_code, discount }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into promos(prod_id, promo_code, discount) values($1, $2, $3) returning id",
        [prod_id, promo_code, discount],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },
  getPromoCode: (key) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from promos where promo_code=$1",
        [key],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },
  editPromo: (id, { prod_id, promo_code, discount }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "update promos set prod_id=$2, promo_code=$3, discount=$4 where id=$1 returning *",
        [id, prod_id, promo_code, discount],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },
  deletePromo: (id) => {
    return new Promise((resolve, reject) => {
      db.query("delete from promos where id=$1", [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
};
