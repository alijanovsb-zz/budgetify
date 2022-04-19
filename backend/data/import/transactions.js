import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import Transaction from "../../models/transactionModel.js";
import transactions from "../transaction.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Transaction.deleteMany();

    await Transaction.insertMany(transactions);

    console.log("Data imported");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

importData();
