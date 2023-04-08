const productModel = require("../models/product.model");

const helper = require("../helpers/pages");
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
      console.log(req.files);
      // await Promise.all(
      //   req.files.map((item) => {
      //     productModel.addImages(result[0].id, item.filename);
      //   })
      // );
      for (const item of req.files) {
        await productModel.addImages(result[0].id, item.filename);
      }
      return res
        .status(201)
        .json({ status: 201, msg: "Success add produtc", data: result });
    } catch (error) {
      console.log(error);
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

      categories = categories || "";
      keyword = keyword || "";
      brand = brand || "";
      color = color || "";
      page = page || 1;

      const [minPrice, maxPrice] = price.split("-");

      let dataFiltering = [];
      dataFiltering = result.filter(
        (item) =>
          item.category_name.toLowerCase().includes(categories) &&
          item.prod_name.toLowerCase().includes(keyword) &&
          item.brand.toLowerCase().includes(brand) &&
          item.color.toLowerCase().includes(color) &&
          item.price >= parseInt(minPrice ? minPrice : 0) &&
          item.price <= parseInt(maxPrice ? maxPrice : Number.MAX_SAFE_INTEGER)
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
      let newResult = helper.listToMatrix(sortingData, limit);

      if (newResult.length == 0) {
        newResult[0] = [];
      }

      return res.status(200).json({
        status: 200,
        msg: "Success get data product",
        data:
          page == ""
            ? newResult[0]
            : page > totalpage
            ? (newResult = [])
            : newResult[page - 1],
        totalData: dataFiltering.length,
        totalpage: totalpage,
        limit: limit,
        page: Number(page) == "" ? 1 : Number(page),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
  editProduct: async (req, res) => {
    try {
      const { id } = req.params;

      console.log(req.body);
      console.log(req.files);
      if (!req.files) {
        return res.status(401).json({ msg: "Image cannot blank" });
      }
      const getData = await productModel.getProductId(id);
      if (getData.length < 1) {
        return res.status(404).json({ status: 404, msg: "Product not found" });
      }
      console.log(getData);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
  getCountCategory: async (req, res) => {
    try {
      const categories = await productModel.allCategories();
      console.log(categories);

      let result = [];
      for (const category of categories) {
        const countResult = await productModel.countCategory(category.id);
        if (countResult.rows[0].count > 0) {
          result.push({
            category_name: category.name,
            total: parseInt(countResult.rows[0].count),
          });
        } else {
          result.push({
            category_name: category.name,
            total: 0,
          });
        }
      }

      return res
        .status(201)
        .json({ status: 201, msg: "Success get data", data: result });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, msg: "internal server error" });
    }
  },
};
