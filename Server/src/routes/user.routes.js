import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/uploadFile.js";
import { acceptRequest, createRequest, declineRequest, getUser, getUsers, updateImageUser, updateInfoUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", verifyToken, getUsers);
router.post("/create/request/friend/:idFriend", verifyToken, createRequest);
router.post("/accept/request/friend/:idFriend", verifyToken, acceptRequest);
router.post("/decline/request/friend/:idFriend", verifyToken, declineRequest);
router.get("/user/:id", verifyToken, getUser);
router.post("/user/update/info", verifyToken, updateInfoUser);
router.post("/user/update/image", verifyToken, upload.single("image"), updateImageUser);

export default router;