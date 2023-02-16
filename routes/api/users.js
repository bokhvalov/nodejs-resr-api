const express = require("express");
const { addUserController } = require("../../controllers/usersController");
const { newUserValidation } = require("../../middlewares/usersValidation");

const router = express.Router();

router.post("/signup", newUserValidation, asyncWrapper(addUserController));


module.exports = router;