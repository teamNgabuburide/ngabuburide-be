const transactionModel = require("../models/transaction.model");
const db = require("../configs/supabase");

module.exports = {
  addTransaction: async (req, res) => {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const addTransaction = await transactionModel.createTransaction(req.body);
      await transactionModel.createTransactionProd(
        req.body.product,
        addTransaction[0].id
      );
      await client.query("COMMIT");
      const result = await transactionModel.getTransactionById(
        addTransaction[0].id
      );
      const summary = result.reduce((acc, cur) => {
        if (!acc) {
          return {
            display_name: cur.display_name,
            email: cur.email,
            promo_code: cur.promo_code,
            discount: cur.discount,
            notes: cur.notes,
            products: [
              {
                prod_name: cur.prod_name,
                price: cur.price,
                qty: cur.qty,
                size_name: cur.size_name,
                subtotal: cur.subtotal,
              },
            ],
          };
        }

        const foundProduct = acc.products.find(
          (p) => p.prod_name === cur.prod_name
        );
        if (foundProduct) {
          foundProduct.qty += cur.qty;
          foundProduct.subtotal += cur.subtotal;
        } else {
          acc.products.push({
            prod_name: cur.prod_name,
            price: cur.price,
            qty: cur.qty,
            size_name: cur.size_name,
            subtotal: cur.subtotal,
          });
        }

        return acc;
      }, null);

      return res.status(200).json({
        status: 200,
        msg: "Success order product",
        data: summary,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    } finally {
      client.release();
    }
  },
};
