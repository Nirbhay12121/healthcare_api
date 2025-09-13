import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Patient = sequelize.define("Patient", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false},
    age: { type: DataTypes.INTEGER, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: false},
    contact: { type: DataTypes.INTEGER, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: true},
    medicalHistory: {type: DataTypes.TEXT, allowNull: true}
});

export default Patient;