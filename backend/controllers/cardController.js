import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";
import User from "../models/userModel.js";

dotenv.config();

const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({ owner: req.user });

  res.send(cards);
});

const addCard = asyncHandler(async (req, res) => {
  const { title, category, amount, currency } = req.body;

  const user = await User.findById(req.body.user.id);
  const card = await Card.create({
    owner: user.id,
    title,
    category,
    amount,
    currency,
  });

  if (card) {
    res.status(201).json({
      id: card.id,
      title: card.title,
      category: card.category,
      amount: card.amount,
      currency: card.currency,
    });
  } else {
    res.status(400).json({ message: "Card not added" });
  }
});

const editCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(404);
    throw new Error("Card not found");
  }

  const { title, category, amount, currency } = req.body;

  card.title = title;
  card.category = category;
  card.amount = amount;
  card.currency = currency;

  await card.save();

  res.status(200).json({
    id: card.id,
    title: card.title,
    category: card.category,
    amount: card.amount,
    currency: card.currency,
  });
});

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(404);
    throw new Error("Card not found");
  }

  await card.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

export { getCards, addCard, editCard, deleteCard };
