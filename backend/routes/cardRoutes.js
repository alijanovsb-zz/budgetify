import express from "express";
import {
  addCard,
  editCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/create", addCard);
router.post("/edit/:id", editCard);
router.post("/delete/:id", deleteCard);

export default router;
