import express from "express";
import {
  getTransactions,
  editTransaction,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import auth from "../config/auth.js";

const router = express.Router();

router.use(auth);

router.get("/getTransactions/:id", getTransactions);
router.post("/create", createTransaction);
router.post("/edit/:id", editTransaction);
router.post("/delete/:id", deleteTransaction);

export default router;
