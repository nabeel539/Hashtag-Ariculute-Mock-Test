import dotenv from "dotenv";
import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymenRoutes from "./routes/paymentRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
console.log("Environment loaded, MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Connect to DB
try {
  await connectDB();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

// MiddleWare
// app.use(cors());
app.use(
  cors({
    origin: "https://hashtag-ariculute-mock-test.onrender.com", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If using cookies/sessions
  })
);
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", paymenRoutes);
app.use("/api/test", testRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

// const hash = bcrypt.hashSync("password@1234", 10);
// console.log("password", hash);
