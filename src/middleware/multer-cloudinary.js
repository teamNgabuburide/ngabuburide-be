const cloudinary = require("../configs/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "test collab",
  },
});

module.exports = {
  uploadImage: (req, res, next) => {
    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype.split("/")[0] !== "image") {
          return res
            .status(401)
            .json({ status: 401, msg: "Only type image allowed" });
        }
        cb(null, true);
      },
      limits: { fileSize: 300000 },
    }).array("images", 6);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(401).json({ msg: err.message });
      } else if (err) {
        return res.status(500).json({ status: 500, msg: err });
      }
      next();
    });
  },
};
