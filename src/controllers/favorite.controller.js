const favoriteModel = require('../models/favorite.model')

const getFavorite = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const result = await favoriteModel.getFavorite(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "favorite Tidak Ditemukan",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
      msg: "Get Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertFavorite = async (req, res) => {
  try {
    const { prod_id } = req.body;
    const {id} = req.authInfo;
    // console.log(prod_id)
  const cekFavorite = await favoriteModel.cekFavorite(id);
  if (cekFavorite.rows.length > 0) {
    for (let i = 0; i < cekFavorite.rows.length; i++) {
      console.log(cekFavorite.rows[i].prod_id)
      if (cekFavorite.rows[i].prod_id == prod_id) {
        return res.status(400).json({
          msg: "product sudah dijadikan favorite",
        });
      }
    }
  }

  const result = await favoriteModel.insertFavorite(id, prod_id);
  return res.status(200).json({
    data: result.rows,
    msg: "product berhasil dijadikan favorite",
  });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { params } = req;
    const { id } = req.authInfo;
    const result = await favoriteModel.deleteFavorite(id, params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getFavorite,
  insertFavorite,
  deleteFavorite
}