const promoModel = require("../models/promo.model");

const addPromo = async (req, res) => {
  try {
    const result = await promoModel.addPromo(req.body);
    return res.status(201).json({
      status: 201,
      msg: "Success add promo",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};
const getPromoByKey = async (req, res) => {
  try {
    const { promo_code } = req.body;
    const result = await promoModel.getPromoCode(promo_code);
    return res.status(200).json({
      status: 200,
      msg: "Success get discount",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};

const editPromo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await promoModel.editPromo(id, req.body);
    return res.status(200).json({
      status: 200,
      msg: "Success edit promo",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await promoModel.deletePromo(id);
    return res.status(200).json({
      status: 200,
      msg: "Success delete promo",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "internal server error" });
  }
};
module.exports = { addPromo, getPromoByKey, editPromo, deletePromo };
