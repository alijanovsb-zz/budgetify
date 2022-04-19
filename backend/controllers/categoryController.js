import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

dotenv.config();

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  console.log(category);

  res.status(200).json({
    success: true,
    data: category,
  });
});
