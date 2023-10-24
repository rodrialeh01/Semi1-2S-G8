import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { translate } from "../controllers/translate.controller.js";

const router = Router();

router.post("/translate", verifyToken, translate);

export default router;