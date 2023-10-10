import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/uploadFile.js";
import { acceptRequest, createRequest, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", verifyToken, getUsers);
router.post("/create/request/friend/:idFriend", verifyToken, createRequest);
router.post("/accept/request/friend/:idFriend", verifyToken, acceptRequest);

export default router;