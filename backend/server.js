import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

connectDB();

const PORT = process.env.PORT;
const app = express();

const logger = (req, res, next) => {
  next();
};
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
