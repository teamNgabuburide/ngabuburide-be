const db = require("../configs/supabase");

const allCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("select name from categories", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

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

const getProductId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select p.id, p.prod_name, p.prod_name, p.description, p.price, p.color, p.brand, q.name as category_name, p.stock, p.condition, a.image from products p join prod_images a on p.id=a.prod_id join categories q on p.category_id=q.id where p.id=$1",
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
};
const getAllProduct = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select p.id, p.prod_name, p.prod_name, p.description, p.price, p.color, p.brand, c.name as category_name, p.stock, p.condition, a.image from products p join prod_images a on p.id=a.prod_id join categories c on p.category_id=c.id",
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
const getCountCategory = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT name, COUNT(*) AS totaldata FROM products INNER JOIN categories ON products.category_id = categories.id GROUP BY categories.id",
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

module.exports = {
  allCategories,
  addProduct,
  addImages,
  getProductId,
  getAllProduct,
  getCountCategory,
};
