import dotenv from "dotenv";
import express from "express";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const logger = (req, res, next) => {
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
