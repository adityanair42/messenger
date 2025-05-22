import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});

export const UserModel = model("User", UserSchema);

const MessageSchema = new Schema({
    username: String,
    message: { type: String, required: true }
});

export const MessageModel = model("Message", MessageSchema);