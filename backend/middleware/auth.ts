import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) : void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token is missing or invalid' });
        return;
    }

    console.log("token: " + token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {walletAddress : string};
    req.body.walletAddress = decoded.walletAddress;
    console.log("walletAddress: " + decoded.walletAddress);
    if (!decoded.walletAddress) {
        res.status(401).json({ message: 'Access token is missing or invalid' });
        return;
    }
    next();
};

export default authenticateJWT;