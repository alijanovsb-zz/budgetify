import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";

dotenv.config();

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user });

  res.json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
});

const createTransaction = asyncHandler(async (req, res) => {
  const {
    card,
    title,
    category,
    amount,
    date,
    description,
    attachment,
    author,
  } = req.body;

  const transaction = await Transaction.create({
    card,
    title,
    category,
    amount,
    date: new Date(date),
    description,
    attachment,
    author,
  });

  res.status(201).json({
    success: true,
    data: transaction,
  });
});

const editTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  const { card, title, category, amount, date, description, attachment } =
    req.body;

  transaction.card = card;
  transaction.title = title;
  transaction.category = category;
  transaction.amount = amount;
  transaction.date = new Date(date);
  transaction.description = description;
  transaction.attachment = attachment;

  await transaction.save();

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await transaction.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
};
