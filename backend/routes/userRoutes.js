import dotenv from "dotenv";
import express from "express";
import {
  authUser,
  editUser,
  deleteUser,
  registerUser,
} from "../controllers/userController.js";
import auth from "../config/auth.js";

dotenv.config();

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/edit", editUser, auth);
router.post("/delete", deleteUser, auth);

export default router;
