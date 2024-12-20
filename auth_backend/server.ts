import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createAuth, type VerifyLoginPayloadParams } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { thirdwebClient } from "./thirdwebClient";
import { decodeJWT } from "thirdweb/utils";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        'https://vercel-deploy-chi-henna.vercel.app', // Frontend
        'https://auth-server-1lft.onrender.com', // Auth Server
        'https://project-voting-web.onrender.com', // API Server
    ],
    credentials: true,
}));


const thirdwebAuth = createAuth({
	domain: process.env.CLIENT_DOMAIN!,
	client: thirdwebClient,
	adminAccount: privateKeyToAccount({
		client: thirdwebClient,
		privateKey: process.env.ADMIN_PRIVATE_KEY!,
	}),
});

app.get("/", (req, res) => {
	return res.send("Auth server is live");
});

app.get("/login", async (req, res) => {
	const address = req.query.address;
	const chainId = req.query.chainId as string | undefined;

	if (typeof address !== "string") {
		return res.status(400).send("Address is required");
	}

	return res.send(
		await thirdwebAuth.generatePayload({
			address,
			chainId: chainId ? parseInt(chainId) : undefined,
		})
	);
});

app.post("/login", async (req, res) => {
	const payload: VerifyLoginPayloadParams = req.body;

	const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

	if (verifiedPayload.valid) {
		const jwt = await thirdwebAuth.generateJWT({
			payload: verifiedPayload.payload,
		});
		console.log('set cookie');
		res.cookie("jwt", jwt, {
			httpOnly: true,
			domain: '.onrender.com',
			secure: true,
			sameSite: 'lax',
			path: '/',
		});
		
		return res.status(200).send({ token: jwt });
	}

	res.status(400).send("Failed to login");
});

app.get("/isLoggedIn", async (req, res) => {
	const jwt = req.cookies?.jwt;
	
	if (!jwt) {
		return res.send(false);
	}

	const authResult = await thirdwebAuth.verifyJWT({ jwt });

	if (!authResult.valid) {
		return res.send(false);
	}
	const user = decodeJWT(jwt).payload.sub;
	console.log('user: ', user);
	return res.send(true);
});

app.post("/logout", (req, res) => {
	res.clearCookie("jwt", {
		httpOnly: true,
		domain: '.onrender.com',
		secure: true,
		sameSite: 'lax',
		path: '/',
    });
	return res.send(true);
});

app.listen(4000, () => {
	console.log(`⚡ Auth server listening on port 4000...`);
});
