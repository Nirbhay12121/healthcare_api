import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { patientValidation } from "../middleware/validation.js";
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .post(patientValidation, createPatient)
  .get(getPatients);

router.route("/:id")
  .get(getPatient)
  .put(patientValidation, updatePatient)
  .delete(deletePatient);

export default router;
