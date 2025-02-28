import { register, login, changePassword } from "../controllers/authController.js";
import express from "express";


const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);

export default router;