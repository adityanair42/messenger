import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

interface JwtPayload {
    id: string;
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(header, JWT_PASSWORD) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
}