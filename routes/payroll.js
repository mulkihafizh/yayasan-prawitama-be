import { Router } from "express";
const router = Router();
import {
  getPayroll,
  getPayrollById,
  updatePayroll,
  getPayrollByEmployeeId,
} from "../controllers/payrollController.js";

router.get("/", getPayroll);
router.get("/:payrollId", getPayrollById);
router.put("/:payrollId", updatePayroll);
router.get("/employee/:employeeId", getPayrollByEmployeeId);

export default router;
