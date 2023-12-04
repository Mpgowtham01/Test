import { Router } from "express";
import {
  createDepartmentname,
  deleteDepartmentName,
  getDepartmentname,
  updateDepartmentName,
} from "../Controller/DepartmentsController.js";

const router = Router();

router.route("/createdepartmentname").post(createDepartmentname);
router.route("/getdepartmentname").get(getDepartmentname);
router.route("/deletedepartmentname/:id").delete(deleteDepartmentName);
router.route("/updateDepartmentName/:id").put(updateDepartmentName);

export default router;
