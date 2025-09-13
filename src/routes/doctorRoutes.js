import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { doctorValidation } from "../middleware/validation.js";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .post(doctorValidation, createDoctor)
  .get(getDoctors);

router.route("/:id")
  .get(getDoctor)
  .put(doctorValidation, updateDoctor)
  .delete(deleteDoctor);

export default router;
