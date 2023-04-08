const cloudinary = require("../configs/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "test collab",
    allowedFormats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = {
  uploadImage: (req, res, next) => {
    const upload = multer({
      storage: storage,
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
