const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

router.get("/", payrollController.getPayroll);
router.get("/:payrollId", payrollController.getPayrollById);
router.put("/:payrollId", payrollController.updatePayroll);
router.get("/employee/:employeeId", payrollController.getPayrollByEmployeeId);
