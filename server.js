// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import mappingRoutes from "./src/routes/mappingRoutes.js";
import { sequelize } from "./src/config/db.js";
import { syncDatabase } from "./src/utils/database.js";

dotenv.config();
console.log("ENV:", process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);


app.get("/api/health", (req, res) => {
  res.json("Healthcare API is running...");
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
