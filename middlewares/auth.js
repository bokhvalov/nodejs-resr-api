const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");
const { getUser } = require("../services/userService");
require("dotenv").config();

const jwtSecret = process.env.SECRET_JWT;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [authType, token] = authorization.split(" ");
  if (authType !== "Bearer") {
    return next(new UnauthorizedError("Not authorized"));
  }
  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return next(new UnauthorizedError("Not authorized"));

    const userData = await getUser(decoded.userId);
    if (userData?.token !== token)
      return next(new UnauthorizedError("Not authorized"));

    const { email, _id, subscription } = userData;
    req.user = { _id, email, subscription };
    next();
  });
};

module.exports = auth;
