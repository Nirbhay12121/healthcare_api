import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Token verify
export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers.autherization && req.headers.autherization.startsWith("Bearer")){
      token = req.headers.autherization.split(" ")[1];

    } if (!token){
        return res.status(401).json({ msg: "Not authorized, no token" });
      }


      try {
        const decoded = jwt.varify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"]}});
        
        if (!req.user){
        return res.status(401).json({msg: "Not authorized, user not found"});
        }
        next();
      } catch (error) {
        return res.status(401).json({ msg: "Not authorized, token failed" });
      }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Role-based guard
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admin only" });
  }
  next();
};
