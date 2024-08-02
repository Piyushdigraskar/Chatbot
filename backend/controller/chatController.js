import { Chat } from "../models/chat.js";

export const createChat = async(req, res)=>{
    try {
        const userId = req.user._id;

        const chat = await Chat.create({
            user: userId,
        })
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

export const getAllChats = async(req, res)=>{
    try {
        const chats = await Chat.find({user: req.user._id}).sort({
            createdAt: -1,
        });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

export const conversation = async(req, res)=>{
    try {
        const chat = 
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}