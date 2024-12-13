import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";

// Mã bí mật để ký JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// Lưu trữ nonce tạm thời (nên sử dụng một giải pháp lưu trữ an toàn hơn trong thực tế, ví dụ Redis)
const nonces: Record<string, string> = {};

// Tạo một nonce ngẫu nhiên
const generateNonce = (): string => {
    return `Sign this message to log in: ${Math.random().toString(36).substring(2)}`;
};

class LoginController {
    // Gửi nonce cho người dùng
    static getNonce(req: Request, res: Response): void {
        const  walletAddress  = req.params.walletAddress;

        if (!walletAddress || !ethers.isAddress(walletAddress as string)) {
            res.status(400).json({ message: "Invalid or missing wallet address." });
            return;
        }

        // Tạo và lưu nonce
        const nonce = generateNonce();
        nonces[walletAddress as string] = nonce;

        res.status(200).json({ walletAddress, nonce });
    }

    // Xác thực chữ ký và tạo access token
    static async verifySignature(req: Request, res: Response): Promise<void> {
        const { walletAddress, signature } = req.body;

        if (!walletAddress || !signature) {
            res.status(400).json({ message: "Wallet address and signature are required." });
            return;
        }

        const nonce = nonces[walletAddress];

        if (!nonce) {
            res.status(400).json({ message: "Nonce not found for wallet address." });
        }

        try {
            // Khôi phục địa chỉ ví từ chữ ký
            const recoveredAddress = ethers.verifyMessage(nonce, signature);

            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                res.status(401).json({ message: "Signature verification failed." });
                return;
            }

            // Xóa nonce sau khi xác thực thành công
            delete nonces[walletAddress];

            // Tạo JWT token
            const token = jwt.sign({ walletAddress }, JWT_SECRET_KEY, { expiresIn: "1h" });

            res.status(200).json({ token });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred during signature verification." });
            return;
        }
    }
}

export default LoginController;
