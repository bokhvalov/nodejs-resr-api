const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");
const { getUser } = require("../services/userService");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [authType, token] = authorization.split(" ");
  console.log(token);
  if (authType !== "Bearer") throw new UnauthorizedError("Not authorized");

  jwt.verify(token, process.env.SECRET_JWT, function (err, userID) {
    if (!userID || err) {
      throw new UnauthorizedError("Not authorized");
      }
      req.user = await getUser(userID);
  next();
  });

  
};

module.exports = auth;
