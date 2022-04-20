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
  const category = await Category.findOne({ _id: req.params.id })
    .populate("transactions")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!category) {
        return res.status(404).json({
          success: false,
          error: "Category not found",
        });
      }
      return category;
    });

  console.log(category);

  res.status(200).json({
    success: true,
    data: category,
  });
});
