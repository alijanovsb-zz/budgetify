import dotenv from "dotenv";
import express from "express";
import {
  authUser,
  editUser,
  deleteUser,
  registerUser,
} from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

router.post("/login", authUser);
router.post("/edit/:id", editUser);
router.post("/register", registerUser);
router.post("/delete/:id", deleteUser);

export default router;
