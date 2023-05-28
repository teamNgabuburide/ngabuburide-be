const db = require("../configs/supabase");
module.exports = {
  createTransaction: ({ user_id, promo_id, payment_id, status_id, notes }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "insert into transactions(user_id, promo_id, payment_id, status_id, notes) values($1,$2,$3,$4,$5) returning id",
        [user_id, promo_id, payment_id, status_id, notes],
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
  createTransactionProd: (products, id) => {
    let query =
      "insert into trans_prod_size(transaction_id, prod_id, size_id, qty, subtotal) values";
    let values = [];
    products.forEach((element, i) => {
      const { prod_id, qty, size_id } = element;
      if (values.length) {
        query += ", ";
      }
      query += `($${1 + 4 * i}, $${2 + 4 * i}, $${3 + 4 * i}, $${
        4 + 4 * i
      }, ((select price from products where id=$${2 + 4 * i}) * $${
        4 + 4 * i
      }))`;
      values.push(id, prod_id, size_id, qty);
    });
    return new Promise((resolve, reject) => {
      db.query(query, values, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
  getTransactionById: (id) => {
    const text =
      "select u.display_name, u.email, pr.promo_code, pr.discount, q.notes, p.prod_name, p.price, t.qty, ps.size_name, t.subtotal, pm.method from trans_prod_size t join products p on p.id=t.prod_id join transactions q on q.id=t.transaction_id join users u on u.id=q.user_id join promos pr on pr.id=q.promo_id join payment_method pm on pm.id=q.payment_id join status_deliv sd on sd.id=q.status_id join prod_size ps on ps.id=t.size_id where q.id=$1";
    const values = [id];
    return new Promise((resolve, reject) => {
      db.query(text, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  getDataTransactionByUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select q.id as transaction_id, u.display_name, u.email, pr.promo_code, pr.discount, q.notes, p.prod_name, p.price, t.qty, ps.size_name, t.subtotal, pm.method from trans_prod_size t join products p on p.id=t.prod_id join transactions q on q.id=t.transaction_id join users u on u.id=q.user_id join promos pr on pr.id=q.promo_id join payment_method pm on pm.id=q.payment_id join status_deliv sd on sd.id=q.status_id join prod_size ps on ps.id=t.size_id where q.user_id=$1",
        [id],
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
};
