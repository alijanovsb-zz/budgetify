import express from "express";
import auth from "../config/auth.js";
import {
  getAllCurrencies,
  getCardCurrency,
} from "../controllers/currencyController.js";

const router = express.Router();

router.use(auth);

router.get("/getAllCurrencies", getAllCurrencies);
router.get("/getCardCurrency/:id", getCardCurrency);

export default router;
