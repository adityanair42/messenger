import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import { MessageModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "User signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

// @ts-ignore
app.get("/chats", userMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User ID not found" });
    }

    try {
        const chats = await MessageModel.find({});
        res.json({ chats });
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch chats" });
    }
})

// @ts-ignore
app.post("/chats", userMiddleware, async (req, res) => {  
    if (!req.userId) {
        return res.status(401).json({ message: "User ID not found" });
    }

    try {
        const message = req.body.message;
        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message cannot be empty" });
        }
        
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const newMessage = await MessageModel.create({
            username: user.username,
            message: message.trim()
        });
        
        res.json({ message: "Chat posted successfully", chat: newMessage });
    } catch (e) {
        res.status(500).json({ message: "Failed to post message" })
    }
})

app.listen(3000);