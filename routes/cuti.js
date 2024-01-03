const express = require("express");
const router = express.Router();
const cutiController = require("../controllers/cutiController");

router.post("/", cutiController.createCuti);
router.get("/", cutiController.getCuti);
router.get("/:cutiId", cutiController.getCutiByID);
router.post("/approve/:cutiId", cutiController.approveCuti);
router.post("/reject/:cutiId", cutiController.rejectCuti);
router.delete("/:cutiId", cutiController.deleteCuti);
router.post("/target/:id", cutiController.getTargetCuti);
router.post("/approve/admin/:cutiId", cutiController.approveCutiAdmin);
router

module.exports = router;
