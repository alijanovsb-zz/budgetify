import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import Currency from "../../models/currencyModel.js";
import currencies from "../currencies.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Currency.deleteMany();

    await Currency.insertMany(currencies);

    console.log("Data imported");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

importData();
