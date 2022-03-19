import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import users from "./users.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    await User.insertMany(users);

    console.log("Data imported");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

importData();
