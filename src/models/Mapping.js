import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Mapping = sequelize.define("Mapping", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    patientId: {type: DataTypes.INTEGER, allowNull: false, references:{model: 'patients', key: 'id'}},
    doctorId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'doctors', key: 'id'}},
    assignedDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    notes: {type: DataTypes.TEXT, allowNull: true}
})