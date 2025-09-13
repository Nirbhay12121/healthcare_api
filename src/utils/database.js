import { Sequelize } from "sequelize";
import {User} from "../models/User.js";
import Patient from "../models/Patient.js";
import {Doctor} from "../models/Doctor.js";
import {Mapping }from "../models/Mapping.js";

// Associations

User.hasMany(Patient, { foreignKey: "userId", onDelete: "CASCADE" });
Patient.belongsTo(User, { foreignKey: "userId" });

Mapping.belongsTo(Patient, { foreignKey: "patientId" });
Mapping.belongsTo(Doctor, { foreignKey: "doctorId" });

Patient.hasMany(Mapping, { foreignKey: "patientId" });
Doctor.hasMany(Mapping, { foreignKey: "doctorId" });


export const syncDatabase = async (sequelize) => {
    try {
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfullty.");
    } catch (error){
        console.log("Error synchronized models:", error);
    }
};

