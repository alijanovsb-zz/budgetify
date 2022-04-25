import express from "express";
import auth from "../config/auth.js";

import {
  getCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.use(auth);

router.get("/getCategories/:id", getCategories);
router.get("/getCategory/:id", getCategory);

export default router;
