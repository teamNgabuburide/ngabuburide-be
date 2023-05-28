const db = require("../configs/supabase");

const allCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from categories", (error, result) => {
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

const countCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT COUNT(*) FROM products WHERE category_id = $1",
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "with delete_prod as (delete from prod_images where prod_id=$1) delete from products where id=$1 returning id",
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

const updateImage = (newImage, currentImage) => {
  return new Promise((resolve, reject) => {
    db.query(
      "with editImage as (select id from prod_images where image=$2) update prod_images set image=$1 from editImage where prod_images.id=editImage.id returning prod_images.id",
      [newImage, currentImage],
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

updateProduct = (
  id,
  prod_name,
  description,
  price,
  brand,
  stock,
  condition
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update products set prod_name=$1, description=$2, price=$3, brand=$4, stock=$5, condition=$6 where id=$7 returning id",
      [prod_name, description, price, brand, stock, condition, id],
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

const getProductByUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select p.id, p.prod_name, c.name, p.description, p.price, p.color, p.brand, p.condition, pi.image from products p join categories c on c.id=p.category_id join prod_images pi on pi.prod_id=p.id where p.seller_id=$1",
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

module.exports = {
  allCategories,
  addProduct,
  addImages,
  getProductId,
  getAllProduct,
  getCountCategory,
  countCategory,
  deleteProduct,
  updateImage,
  updateProduct,
  getProductByUser,
};
