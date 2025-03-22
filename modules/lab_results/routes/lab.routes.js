import { verifyToken } from "../middleware/auth.js";
import express from "express";
import { recordLabResult, getLabResult } from "../controller/lab.controller.js";

const router = express.Router();

router.post("/lab", verifyToken, recordLabResult);
router.get("/lab/:id", verifyToken, getLabResult);


export default router;