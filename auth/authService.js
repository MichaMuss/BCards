const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");
const config = require("config");
const tokenGenerator = config.get("tokenGenerator");



const auth = (req, res, next) => {
  if (tokenGenerator == "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient)
        throw new Error("Authentication Error: Please Login");
      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) throw new Error("Authentication Error: Unauthorize user");
      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  return handleError(
    res,
    500,
    "internal error: you need to use valid token generator"
  );
};

module.exports = auth;

