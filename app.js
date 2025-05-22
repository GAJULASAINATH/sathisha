import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// Load environment variables
dotenv.config({ path: "/Users/macbook/Desktop/sathish/MERN_STACK_RESTAURANT_RESERVATION/backend/.env" });

const app = express();

// ✅ Apply full CORS config to all routes
app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Your frontend
  credentials: true,               // ✅ Allows cookies, auth headers
}));

// Enable JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Your routes
app.use("/api/v1/reservation", reservationRouter);

// ✅ Basic route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// ✅ Error middleware (always last)
app.use(errorMiddleware);

// ✅ Connect DB
dbConnection();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⁠ App is running at port ${PORT}`);
});

export default app;