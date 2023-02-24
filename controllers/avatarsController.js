const multer = require("multer");

const updateAvatarController = async (req, res, next) => {
  res.json(req.file);
};

module.exports = { updateAvatarController };
