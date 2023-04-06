const profileModel = require("../models/profile.model");
const { uploaderUsers } = require("../utils/cloudinary");
const db = require("../configs/supabase");

const getProfile = async (req, res) => {
  try {
    // const { query } = req;
    const { id } = req.authInfo;
    // console.log(id);
    const result = await profileModel.getProfile(id);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Users Tidak Ditemukan",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    let fileLink = "";
    if (req.file) {
      const fileName = req.authInfo.id;
      const upCloud = await uploaderUsers(req, "user", fileName);
      fileLink = upCloud.data.secure_url;
    }
    const resultUserBio = await profileModel.updateUsers(client, req, fileLink);
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Update Success...",
      data: resultUserBio.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
