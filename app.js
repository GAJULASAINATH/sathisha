import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// ✅ Only call dotenv.config once
dotenv.config({ path: "/Users/macbook/Desktop/sathish/MERN_STACK_RESTAURANT_RESERVATION/backend/.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

dbConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});

app.use(errorMiddleware);

export default app;
