import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Doctor = sequelize.define("Doctor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    specialize: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.INTEGER, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, validate: {isEmail: true}},
    experience: {type: DataTypes.INTEGER, allowNull: true},
    hospital: {type: DataTypes.STRING, allowNull: false}
})