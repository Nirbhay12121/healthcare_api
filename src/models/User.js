import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, validate:{notEmpty: true} },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate:{notEmpty: true} },
  password: { type: DataTypes.STRING, allowNull: false, validate:{len: [6, 100]} },
  role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
}, {
  hooks: {
  beforeCreate: async (user) => {
    if (user.password && !user.password.startsWith('$2b$')) {
      // sirf tab hash karo jab password plain text ho
      user.password = await bcrypt.hash(user.password, 12);
    }
  }
}
});

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



