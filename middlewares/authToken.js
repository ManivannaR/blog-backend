const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = decoded.id;
      next();
    });
  } else {
    res.status(403).json({ message: "Please login" });
  }
};

module.exports = authToken;
