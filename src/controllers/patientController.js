import { Op } from "sequelize";
import Patient from "../models/Patient.js";

export const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create({
           ...req.body,
           userId: req.eser.id
        });

        res.status(201).json({ patient });
    } catch (error) {
        res.status(500).json({ msg: "server error", error: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            where: { userId: req.user.id},
            order: [["createdAt", "DESC"]]
        });
        res.json( patients );
    } catch (error) {
        res.status(500).json({ msg: "server error", error: error.message });
    }
};

export const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {id: req.params.id, userId: req.user.id}
        });

        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        res.json( patient );
    } catch (error) {
        res.status(500).json({ msg: "server error", error: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {id: req.params.id, userId: req.user.id}
        });

        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" } );
        }
        await patient.update(req.body);
        res.json( patient );
    } catch (error) {
        res.status(500).json({ msg: "server error", error: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {id: req.params.id, userId: req.user.id}
        });

        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" } );
        }

        await patient.destroy();
        res.json({ msg: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ msg: "server error", error: error.message });
    }
};

