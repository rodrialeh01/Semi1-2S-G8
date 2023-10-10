import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/uploadFile.js";
import { createPublication, getPublications } from "../controllers/publication.controller.js";

const router = Router();

router.post("/create/publication", verifyToken, upload.single('image'), createPublication);
router.get("/publications", verifyToken, getPublications);

export default router;