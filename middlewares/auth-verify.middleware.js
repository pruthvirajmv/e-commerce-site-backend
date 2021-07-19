var jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.model");
const JWT_KEY = process.env.JWT_KEY;

const authVerify = async (req, res, next) => {
   try {
      const tokenWithBearer = req.headers.authorization;
      const token = tokenWithBearer.split(" ")[1];
      const decodedToken = jwt.verify(token, JWT_KEY);
      console.log(decodedToken);
      const user = await User.findById(userId);
      if (!user) {
         res.status(401).json({ message: "Unauthorized request" });
         return;
      }
      req.user = user;
      next();
   } catch (error) {
      res.status(401).json({ message: "Unauthorized request", errorMessage: error.message });
   }
};

module.exports = { authVerify };
