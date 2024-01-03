const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const upload = require("../lib/multer");
const fs = require("fs");

// Rute untuk membuat certificate baru
router.post(
  "/",
  upload.single("file"),
  certificateController.createCertificate
);

// Rute untuk mendapatkan semua certificate
router.get("/", certificateController.getAllCertificate);

// Rute untuk mendapatkan certificate berdasarkan ID
router.get(
  "/:certificateId",
  certificateController.getCertificateByID
);

// Rute untuk memperbarui certificate berdasarkan ID
router.put(
  "/:certificateId",
  certificateController.updateCertificate
);

// Rute untuk menghapus certificate berdasarkan ID
router.delete(
  "/certificates/:certificateId",
  certificateController.deleteCertificate
);

module.exports = router;
