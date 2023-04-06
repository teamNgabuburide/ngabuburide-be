const db = require("../configs/supabase");

const addProduct = ({
  seller_id,
  prod_name,
  description,
  price,
  color,
  brand,
  category_id,
  stock,
  condition,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into products(seller_id, prod_name, description, price, color, brand, category_id, stock, condition) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id",
      [
        seller_id,
        prod_name,
        description,
        price,
        color,
        brand,
        category_id,
        stock,
        condition,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const addImages = (id, filename) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into prod_images(prod_id, image) values($1, $2)",
      [id, filename],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = { addProduct, addImages };
