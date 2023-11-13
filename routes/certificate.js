const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Rute untuk membuat certificate baru
router.post('/certificates', certificateController.createCertificate);

// Rute untuk mendapatkan semua certificate
router.get('/certificates', certificateController.getAllCertificate);

// Rute untuk mendapatkan certificate berdasarkan ID
router.get('/certificates/:certificateId', certificateController.getCertificateByID);

// Rute untuk memperbarui certificate berdasarkan ID
router.put('/certificates/:certificateId', certificateController.updateCertificate);

// Rute untuk menghapus certificate berdasarkan ID
router.delete('/certificates/:certificateId', certificateController.deleteCertificate);

module.exports = router;
