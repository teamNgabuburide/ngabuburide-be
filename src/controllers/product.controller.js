const productModel = require("../models/product.model");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const result = await productModel.addProduct(req.body);
      await Promise.all(
        req.files.map((item) => {
          productModel.addImages(result[0].id, item.filename);
        })
      );
      return res
        .status(201)
        .json({ status: 201, msg: "Success add produtc", data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
};
