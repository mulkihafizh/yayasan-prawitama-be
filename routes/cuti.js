import { Router } from "express";
const router = Router();
import {
  createCuti,
  getCuti,
  getCutiByID,
  approveCuti,
  rejectCuti,
  deleteCuti,
  getTargetCuti,
  approveCutiAdmin,
  getUserCuti,
} from "../controllers/cutiController.js";

router.post("/", createCuti);
router.get("/", getCuti);
router.get("/:cutiId", getCutiByID);
router.post("/approve/:cutiId", approveCuti);
router.delete("/:cutiId", deleteCuti);
router.get("/target/:id", getTargetCuti);
router.post("/approve/admin/:cutiId", approveCutiAdmin);
router.get("/user/:userId", getUserCuti);

export default router;
