import { Router } from "express";
import { home } from "../controllers/home.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/home", verifyToken, home);

export default router;