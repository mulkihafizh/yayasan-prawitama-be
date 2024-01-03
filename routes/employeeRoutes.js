// employeeRoutes.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const employeeMiddleware = require("../middleware/employeeMiddleware");

// Membuat karyawan baru (POST /employees)
router.post("/", employeeController.createEmployee);

// Mendapatkan semua karyawan (GET /employees)
router.get("/", employeeController.getAllEmployees);

// Mendapatkan karyawan berdasarkan ID (GET /employees/:employeeId)
router.get("/:employeeId", employeeController.getEmployeeById);

// Memperbarui karyawan berdasarkan ID (PUT /employees/:employeeId)
router.put(
  "/:employeeId",
  employeeMiddleware.validateEmployeeData,
  employeeController.updateEmployee
);

// Menghapus karyawan berdasarkan ID (DELETE /employees/:employeeId)
router.delete("/:employeeId", employeeController.deleteEmployee);

module.exports = router;
