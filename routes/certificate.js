import { Router } from "express";
const router = Router();
import {
  createCertificate,
  getAllCertificate,
  getCertificateByID,
  updateCertificate,
  deleteCertificate,
  getUserCertificate,
} from "../controllers/certificateController.js";
import upload from "../lib/multer.js";
import fs from "fs";

// Rute untuk membuat certificate baru
router.post("/", upload.single("file"), createCertificate);

// Rute untuk mendapatkan semua certificate
router.get("/", getAllCertificate);

// Rute untuk mendapatkan certificate berdasarkan ID
router.get("/:certificateId", getCertificateByID);

// Rute untuk memperbarui certificate berdasarkan ID
router.put("/:certificateId", updateCertificate);

// Rute untuk menghapus certificate berdasarkan ID
router.delete("/certificates/:certificateId", deleteCertificate);

router.get("/user/:userId", getUserCertificate);

export default router;
