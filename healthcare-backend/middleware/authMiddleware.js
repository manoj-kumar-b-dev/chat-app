const jwt = require("jsonwebtoken");
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({
        message: "No token, Access denaid!"
      })
    }
    const verified = jwt.verify(token, "secure@2311");
    req.user = verified
    next()
  }
  catch (error) {
    res.status(400).json({ message: "invalid token" })
  }
}
module.exports = authMiddleWare