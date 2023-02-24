const Jimp = require("jimp");
var fs = require("fs");
const path = require("path");

const updateAvatarController = async (req, res, next) => {
  const uploadedFilePath = req.file.destination;
  const uploadedFileName = req.file.filename;
  const userId = req.user._id;
  const newAvatarPath = path.resolve(
    projectRootDirectory,
    "public",
    "avatars",
    "avatar-" + userId
  );

  fs.unlinkSync(newAvatarPath);

  await Jimp.read(uploadedFilePath + uploadedFileName)
    .then((img) => {
      img.resize(250, 250).write("avatar-", userId);
    })
    .catch((err) => {
      fs.unlinkSync(uploadedFile);
      next(err);
    });

    fs.rename(
      uploadedFilePath + "avatar-" + userId,
      newAvatarPath,
      function (err) {
        if (err) console.log("old avatar does not exist")
      }
    );
};

module.exports = { updateAvatarController };
