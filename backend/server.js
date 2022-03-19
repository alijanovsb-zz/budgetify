import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT;
const app = express();

const logger = (req, res, next) => {
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
