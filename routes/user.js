import { Router } from "express";
import {
  signUp,
  signIn,
  signOut,
  findUser,
} from "../controllers/userController.js";
import { checkPayrollAdmin } from "../middleware/employeeMiddleware.js";
import { check } from "express-validator";
const router = Router();

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
  // checkPayrollAdmin,
  signIn
);

router.get("/signout", signOut);

router.get("/employee", findUser);
export default router;
