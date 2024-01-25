import { Router } from "express";
const router = Router();
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";

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

export default router;
