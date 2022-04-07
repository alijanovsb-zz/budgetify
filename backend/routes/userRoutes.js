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

router.post("/", authUser);
router.patch("/", registerUser);
router.put("/", editUser, auth);
router.delete("/", deleteUser, auth);

export default router;
