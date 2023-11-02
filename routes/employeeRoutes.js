// employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const employeeMiddleware = require('../middleware/employeeMiddleware');

// Membuat karyawan baru (POST /employees)
router.post('/employees', employeeMiddleware.validateEmployeeData, employeeController.createEmployee);

// Mendapatkan semua karyawan (GET /employees)
router.get('/employees', employeeController.getAllEmployees);

// Mendapatkan karyawan berdasarkan ID (GET /employees/:employeeId)
router.get('/employees/:employeeId', employeeController.getEmployeeById);

// Memperbarui karyawan berdasarkan ID (PUT /employees/:employeeId)
router.put('/employees/:employeeId', employeeMiddleware.validateEmployeeData, employeeController.updateEmployee);

// Menghapus karyawan berdasarkan ID (DELETE /employees/:employeeId)
router.delete('/employees/:employeeId', employeeController.deleteEmployee);



module.exports = router;
