const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middlewares/auth");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { updateAvatarController } = require("../controllers/avatarsController");
const { dirname } = require("path");

const projectRootDirectory = dirname(require.main.filename);
console.log(projectRootDirectory)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(projectRootDirectory, "tmp"));
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").at(-1);
    cb(null, file.fieldname + "-" + uuidv4() + "." + extension);
  },
});
const upload = multer({ storage: storage });

router.use(
  "/",
  auth,
  express.static(path.resolve(projectRootDirectory, "public", "avatars"))
);

router.patch(
  "/",
  auth,
  upload.single("avatar"),
  asyncWrapper(updateAvatarController)
);

module.exports = router;
