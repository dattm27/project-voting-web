import express from "express";
import LoginController from "../controllers/Login";
const router = express.Router();

// Route để lấy nonce
router.get("/:walletAddress", LoginController.getNonce);

// Route để xác thực chữ ký và tạo JWT
router.post("/verify", LoginController.verifySignature);

export default router;
