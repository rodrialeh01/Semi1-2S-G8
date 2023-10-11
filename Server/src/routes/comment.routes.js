import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createComment, getCommentsByPublication } from "../controllers/comment.controller.js";

const router = Router();

router.post("/create/comment", verifyToken, createComment);
router.get("/comments/:idPublication", verifyToken, getCommentsByPublication);

export default router;