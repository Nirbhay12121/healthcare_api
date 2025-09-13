import { Router } from "express";
import { register, login, createAdmin } from "../controllers/authController.js";
import { authMiddleware, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// only admin can access this
router.post("/create-admin", authMiddleware, requireAdmin, createAdmin);

export default router;
