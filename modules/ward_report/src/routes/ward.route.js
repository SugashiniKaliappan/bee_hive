import express from "express";
import { createWard, getAllWards } from "../controller/ward.controller.js"; // ✅ Named imports

const router = express.Router();

router.post("/", createWard);
router.get("/", getAllWards);

export { router }; // ✅ Named export
