import express from "express";
import auth from "../config/auth.js";

import {
  getCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.use(auth);

router.get("/getCategory/", getCategories);
router.get("/getCategory/:id", getCategory);

export default router;
