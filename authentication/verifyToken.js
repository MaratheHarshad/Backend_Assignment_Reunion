// verify the token here,
// using next() middleware
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {

    
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  const token = req.header("token");

  if (!token) {
    return res.status(404).send({ message: "Access denied" });
  }

  // Remove 'Bearer ' prefix from token
  const tokenWithoutPrefix = token.replace("Bearer ", "");

  try {
    const user = jwt.verify(tokenWithoutPrefix, JWT_SECRET_KEY);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(400).send({ message: "invalid token" });
  }
};

module.exports = { verifyJWT };
