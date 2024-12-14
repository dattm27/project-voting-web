import express from "express";
import LoginController from "../controllers/Login";
import authenticateJWT from "../middleware/auth";
const router = express.Router();

// Route để lấy nonce
router.get("/:walletAddress", LoginController.getNonce);

router.post("/:walletAddress", LoginController.createAccessToken);

// Route để xác thực chữ ký và tạo JWT
router.post("/verify", LoginController.verifySignature);

export default router;
