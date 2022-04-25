import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";
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
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/currencies", currencyRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
// app.listen(3000, "0.0.0.0", function () {
//   console.log("Listening to port:  " + 3000);
// });
