const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(404).send("NOT TOKEN PROVIDED");
    else {
      const payload = jwt.verify(token, process.env.secretKey);
      if (!payload) return res.status(401).send("Unauthorized");
      else {
        req.payload = payload;
      }
    }

    next();
  } catch (error) {
    res.status(400).send("Error in Auth");
  }
};
