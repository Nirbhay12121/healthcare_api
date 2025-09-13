import { body, validationResult } from "express-validator";

// Validation rules for user registration
export const handleValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validationResults = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    handleValidationError,
];

export const validateLogin = [
    body("email").notEmpty().withMessage("Valid Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationError,
];

export const patientValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("age").isInt({ min: 0 }).withMessage("Valid age is required"),
    body("gender").isIn(['Male', 'Female', 'Other']).withMessage("Valid gender is required"),
    handleValidationError,
];

export const doctorValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    handleValidationError,
];

export const mappingValidation = [
    body("patientId").isInt().withMessage("Valid patientId is required"),
    body("doctorId").isInt().withMessage("Valid doctorId is required"),
    handleValidationError,
];