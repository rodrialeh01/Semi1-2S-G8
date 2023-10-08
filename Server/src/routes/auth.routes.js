import { Router } from "express";
import { signInPassword, signInFaceID, signUp, upload } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign/up", upload.single('image'), signUp);
router.post("/sign/in/password", signInPassword);
router.post("/sign/in/faceID", upload.single('image'), signInFaceID);

export default router;