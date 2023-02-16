const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  addUserController,
  loginController,
} = require("../../controllers/usersController");
const { userValidation } = require("../../middlewares/usersValidation");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/signup/", userValidation, asyncWrapper(addUserController));
router.post("/login/", auth, userValidation, asyncWrapper(loginController));
module.exports = router;
