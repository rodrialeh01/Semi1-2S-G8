import { Router } from "express";
import { createChat, findChat, findUsersChats } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createChat);
router.get("/:userId", verifyToken, findUsersChats);
router.get("/find/:firstId/:secondId", verifyToken, findChat);

export default router;