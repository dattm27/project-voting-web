import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import { createAuth, type VerifyLoginPayloadParams } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { thirdwebClient } from "../thirdwebClient";
import { decodeJWT } from "thirdweb/utils";

// Mã bí mật để ký JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const thirdwebAuth = createAuth({
    domain: process.env.CLIENT_DOMAIN!,
    client: thirdwebClient,
    adminAccount: privateKeyToAccount({
        client: thirdwebClient,
        privateKey: process.env.ADMIN_PRIVATE_KEY!,
    }),
});


class LoginController {
    // Gửi nonce cho người dùng
    static async getPayLoad(req: Request, res: Response): Promise<void> {
        const address = req.query.address;
        const chainId = req.query.chainId;

        if (typeof address !== "string") {
            res.status(400).send("Address is required");
            return;
        }

        const result = await thirdwebAuth.generatePayload({
            address,
            chainId: typeof chainId === "string" ? parseInt(chainId) : undefined,
        });
        console.log (result);
        res.status(200).json(result);
        return;
    }

    static async createAccessToken(req: Request, res: Response): Promise<void> {
        const walletAddress = req.params.walletAddress;
        if (!walletAddress || !ethers.isAddress(walletAddress as string)) {
            res.status(400).json({ message: "Invalid or missing wallet address." });
            return;
        }

        const token = jwt.sign({ walletAddress }, JWT_SECRET_KEY, { expiresIn: "1h" });
        console.log(token);
        res.status(200).json({ token });
    }

    // Xác thực chữ ký và tạo access token
    static async verifySignature(req: Request, res: Response): Promise<void> {
        const payload: VerifyLoginPayloadParams = req.body;
        const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
        console.log(verifiedPayload);

        if (verifiedPayload.valid) {
            const jwt = await thirdwebAuth.generateJWT({
                payload: verifiedPayload.payload,
            });
            res.cookie("jwt", jwt);
            res.status(200).send({ token: jwt });
            return;
        }

        res.status(400).send("Failed to login");
    }

    static async isLogin(req: Request, res: Response): Promise<void> {
        const jwt = req.cookies?.jwt;

        if (!jwt) {
            res.send(false);
            return;
        }

        const authResult = await thirdwebAuth.verifyJWT({ jwt });

        if (!authResult.valid) {
            res.send(false);
            return;
        }
        const user = decodeJWT(jwt).payload.sub;
        console.log('user: ', user);
        res.send(true);
    }

    static async logout(req: Request, res: Response): Promise<void> {
        res.clearCookie("jwt");
	    res.send(true);
    }
}

export default LoginController;
