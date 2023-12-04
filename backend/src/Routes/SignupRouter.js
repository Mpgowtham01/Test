import { Router } from "express";
import {
  deleteUser,
  getEmployee,
  getoneUser,
  updatedepartmentName,
  userLogin,
  userSignup,
} from "../Controller/SignupController/SignupController.js";
const router = Router();

router.route("/create").post(userSignup);
router.route("/getEmployee").get(getEmployee);
router.route("/deleteemployee/:id").delete(deleteUser);
router.route("/updatedepartmentName/:id").put(updatedepartmentName);
router.route("/getoneuser/:id").get(getoneUser);

router.route("/login").post(userLogin);

export default router;
