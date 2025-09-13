
import bcrypt from "bcryptjs";
import { sequelize } from "./src/config/db.js";
import { User } from "./src/models/User.js";

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    const password = "Nirbhay@1234"; 
    const hash = await bcrypt.hash(password, 10);

    const [admin, created] = await User.findOrCreate({
      where: { email: "nirbhay@gmail.Com" }, 
      defaults: {
        name: "Super Admin",
        email: "nirbhay@gmail.Com",
        password: hash,
        role: "admin",
      },
    });

    if (created) {
      console.log("Default admin created:", admin.email);
    } else {
      console.log("Admin already exists:", admin.email);
    }

    process.exit();
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
