const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  findUser,
} = require("../controllers/userController");
const { checkPayrollAdmin } = require("../middleware/employeeMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  [
    check("password", "Password should be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("password", "Password should be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  checkPayrollAdmin,
  signIn
);

router.get("/signout", signOut);

router.get("/employee", findUser);
module.exports = router;
