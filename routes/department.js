const express = require("express");
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
  updateDepartment,
  ceateDepartment,
} = require("../controllers/departmentController");

// Rute untuk membuat departemen baru
router.post("/", createDepartment);

// Rute untuk mendapatkan semua departemen
router.get("/", getAllDepartments);

// Rute untuk mendapatkan departemen berdasarkan ID
router.get("/:departmentId", getDepartmentById);

// Rute untuk memperbarui departemen berdasarkan ID
router.put("/:departmentId", updateDepartment);

// Rute untuk menghapus departemen berdasarkan ID
router.delete("/:departmentId", deleteDepartment);

module.exports = router;
