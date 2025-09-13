import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { mappingValidation } from "../middleware/validation.js";
import {
  createMapping,
  getMappings,
  getPatientMappings,
  deleteMapping,
} from "../controllers/mappingController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .post(mappingValidation, createMapping)
  .get(getMappings);

router.get("/:patient_id", getPatientMappings);
router.delete("/:id", deleteMapping);

export default router;
