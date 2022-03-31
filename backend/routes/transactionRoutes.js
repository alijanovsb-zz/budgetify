import express from "express";
import {
  editTransaction,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/create", createTransaction);
router.post("/edit/:id", editTransaction);
router.post("/delete/:id", deleteTransaction);

export default router;
