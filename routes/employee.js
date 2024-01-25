// employeeRoutes.js
import { Router } from "express";
const router = Router();
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  attendance,
  getEmployees,
} from "../controllers/employeeController.js";
import { validateEmployeeData } from "../middleware/employeeMiddleware.js";

// Membuat karyawan baru (POST /employees)
router.post("/", createEmployee);

// Mendapatkan semua karyawan (GET /employees)
router.get("/", getAllEmployees);

// Mendapatkan karyawan berdasarkan ID (GET /employees/:employeeId)
router.get("/:employeeId", getEmployeeById);

// Memperbarui karyawan berdasarkan ID (PUT /employees/:employeeId)
router.put("/:employeeId", validateEmployeeData, updateEmployee);

// Menghapus karyawan berdasarkan ID (DELETE /employees/:employeeId)
router.delete("/:employeeId", deleteEmployee);

router.post("/attendance", attendance);

router.get("/employees/role/", getEmployees);

export default router;
