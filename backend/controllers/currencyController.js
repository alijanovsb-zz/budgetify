import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Currency from "../models/currencyModel.js";

dotenv.config();

const getAllCurrencies = asyncHandler(async (req, res) => {
  const currencies = await Currency.find();

  res.status(200).json({
    success: true,
    count: currencies.length,
    data: currencies,
  });
});

const getCardCurrency = asyncHandler(async (req, res) => {
  const currency = await Currency.findOne({ _id: req.params.id });

  if (!currency) {
    return res.status(404).json({
      success: false,
      error: "Currency not found",
    });
  }

  res.status(200).json({
    success: true,
    data: currency,
  });
});

export { getAllCurrencies, getCardCurrency };
