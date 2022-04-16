import express from "express";
import auth from "../config/auth.js";
import {
  getCards,
  addCard,
  editCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.use(auth);

router.get("/getCards", getCards);
router.post("/create", addCard);
router.post("/edit/:id", editCard);
router.post("/delete/:id", deleteCard);

export default router;
