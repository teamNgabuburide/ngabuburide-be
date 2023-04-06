const productModel = require("../models/product.model");
module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const result = await productModel.allCategories();
      return res
        .status(200)
        .json({ status: 200, msg: "Success get all categories", data: result });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
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
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const getData = await productModel.getProductId(id);
      const result = getData.reduce((acc, curr) => {
        const existing = acc.find((item) => item.id === curr.id);
        if (existing) {
          existing.image.push(curr.image);
        } else {
          acc.push({ ...curr, image: [curr.image] });
        }
        return acc;
      }, []);
      return res
        .status(201)
        .json({ status: 201, msg: "Success get data product", data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      let { brand, color, price, order, categories, keyword, page, limit } =
        req.query;
      const getData = await productModel.getAllProduct();
      const result = getData.reduce((acc, curr) => {
        const existing = acc.find((item) => item.id === curr.id);
        if (existing) {
          existing.image.push(curr.image);
        } else {
          acc.push({ ...curr, image: [curr.image] });
        }
        return acc;
      }, []);

      categories = categories || "accessories";
      keyword = keyword || "";
      brand = brand || "";
      color = color || "";
      const [minPrice, maxPrice] = price.split("-");

      let dataFiltering = [];
      dataFiltering = result.filter(
        (item) =>
          item.category_name.toLowerCase() === categories &&
          item.prod_name.toLowerCase().includes(keyword) &&
          item.brand.toLowerCase().includes(brand) &&
          item.color.toLowerCase().includes(color) &&
          item.price >= parseInt(minPrice) &&
          item.price <= parseInt(maxPrice)
      );

      limit = Number(limit) < 15 ? 15 : Number(limit);

      const totaldata = dataFiltering.length;
      const totalpage = Math.ceil(totaldata / limit);

      const sortingData =
        order == "ascending"
          ? dataFiltering.sort((a, b) => {
              if (a.prod_name < b.prod_name) {
                return -1;
              }
              if (a.prod_name > b.prod_name) {
                return 1;
              }
              return 0;
            })
          : dataFiltering.sort((a, b) => {
              if (a.prod_name < b.prod_name) {
                return 1;
              }
              if (a.prod_name > b.prod_name) {
                return -1;
              }
              return 0;
            });

      return res.status(200).json({
        status: 200,
        msg: "Success get data product",
        data: sortingData,
        totalData: dataFiltering.length,
        totalpage: totalpage,
        limit: limit,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
};
