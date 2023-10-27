import { Router } from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createMessage);
router.get("/:chatId", verifyToken, getMessages);

export default router;