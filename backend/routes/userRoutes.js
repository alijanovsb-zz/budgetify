import dotenv from "dotenv";
import express from "express";
import { authUser } from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

router.post("/login", authUser);

export default router;
