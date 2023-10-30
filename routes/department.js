const express = require('express');
const router = express.Router();
const { createDepartment, getAllDepartments, getDepartmentById, deleteDepartment, updateDepartment, ceateDepartment} = require("../controllers/departmentController");

// Rute untuk membuat departemen baru
router.post('/departments', createDepartment);

// Rute untuk mendapatkan semua departemen
router.get('/departments', getAllDepartments);

// Rute untuk mendapatkan departemen berdasarkan ID
router.get('/departments/:departmentId', getDepartmentById);

// Rute untuk memperbarui departemen berdasarkan ID
router.put('/departments/:departmentId', updateDepartment);

// Rute untuk menghapus departemen berdasarkan ID
router.delete('/departments/:departmentId', deleteDepartment);

module.exports = router;
