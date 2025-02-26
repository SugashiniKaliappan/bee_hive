import { verifyToken } from "../middleware/auth.js";
import express from "express";
import { getDailyTreatment, recordDiagnosis, recordTreatement, getTreatment, getDiagnosis, recordDailyTreatment, signOffTreatment, updateTreatment } from "../controller/entry.controller.js";

const router = express.Router();



router.get("/treatment/:id", verifyToken, getTreatment);
router.post("/treatment", verifyToken, recordTreatement);
router.patch("/treatment/:id", verifyToken, updateTreatment);
router.get("/diagnosis/:id", verifyToken, getDiagnosis);
router.put("/diagnosis", verifyToken, recordDiagnosis);
router.get("/treatment/daily/:id", verifyToken, getDailyTreatment);
router.post("/treatment/daily", verifyToken, recordDailyTreatment);
router.put("/treatment/signoff", verifyToken, signOffTreatment);


export default router;
