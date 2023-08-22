const { verifyToken } = require("./providers/jwt");
const config = require("config");
const tokenGenerator = config.get("tokenGenerator");

const optionalAuth = (req, res, next) => {

  if (tokenGenerator == "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient){
        req.user = null;
        return next();
      }
      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) {
        req.user = null;
        return next();
      }

      req.user = userInfo;
       return next();

    } catch (error) {
        req.user = null;
      return netx();
    }
  }

   };
module.exports = optionalAuth;