import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import Category from "../../models/categoryModel.js";
import categories from "../categories.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("Data imported");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

importData();
